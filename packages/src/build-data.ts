import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  statSync,
} from 'fs';
import { performance } from 'node:perf_hooks';
import { join, dirname } from 'path';
import { marked } from 'marked';
import markedCodeFormat from 'marked-code-format';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import prettier from 'prettier';
import type {
  ProblemData,
  IndexData,
  TestResult,
  Difficulty,
} from './types.js';
import { problemMetaSchema, testCaseSchema } from './types.js';
// @ts-expect-error: No type definitions for the config file
import prettierConfig from '../../prettier.config.js';

export interface BuildDataOptions {
  watch?: boolean;
}

function findProblemFiles(dir: string): string[] {
  const files: string[] = [];

  function traverse(currentDir: string) {
    const items = readdirSync(currentDir);

    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * Format TypeScript code using Prettier
 * This ensures consistent, readable formatting for all extracted solutions
 */
async function formatTypeScriptCode(code: string): Promise<string> {
  try {
    const formatted = await prettier.format(code, {
      ...prettierConfig,
      parser: 'typescript',
    });
    return formatted;
  } catch (error) {
    console.warn('Failed to format code with Prettier:', error);
    return code; // Return unformatted code on error
  }
}

/**
 * Sanitize test cases by replacing functions with string representations
 * This is needed because functions cannot be serialized to JSON
 */
function sanitizeTestCases(testCases: any[]): any[] {
  const sanitizeValue = (value: any): any => {
    if (typeof value === 'function') {
      // Try to get function name or use a generic placeholder
      const funcName = value.name || 'anonymous';
      return `[Function: ${funcName}]`;
    }
    if (Array.isArray(value)) {
      return value.map(sanitizeValue);
    }
    if (value !== null && typeof value === 'object') {
      const sanitized: any = {};
      for (const [key, val] of Object.entries(value)) {
        sanitized[key] = sanitizeValue(val);
      }
      return sanitized;
    }
    return value;
  };

  return testCases.map((testCase) => ({
    ...testCase,
    input: sanitizeValue(testCase.input),
    expected: sanitizeValue(testCase.expected),
    actual:
      testCase.actual !== undefined
        ? sanitizeValue(testCase.actual)
        : undefined,
  }));
}

/**
 * Extract the base name from a solution or case name
 * e.g., "problem3Solution" -> "problem3", "problem3Cases" -> "problem3"
 */
function extractBaseName(name: string): string | null {
  // Remove common suffixes
  const baseName = name
    .replace(/Solution$/, '')
    .replace(/Cases$/, '')
    .replace(/Case$/, '');
  return baseName !== name ? baseName : null;
}

/**
 * Check if a case array name matches a solution name
 * e.g., "problem3Cases" matches "problem3Solution"
 */
function matchesSolution(caseArrayName: string, solutionName: string): boolean {
  const caseBase = extractBaseName(caseArrayName);
  const solutionBase = extractBaseName(solutionName);
  return (
    caseBase !== null && solutionBase !== null && caseBase === solutionBase
  );
}

/**
 * Check if a case array name is generic (should be run for all solutions)
 * Generic names don't match any solution pattern
 */
function isGenericCaseArray(
  caseArrayName: string,
  solutionNames: string[]
): boolean {
  const caseBase = extractBaseName(caseArrayName);
  if (caseBase === null) {
    return true; // Doesn't follow naming pattern, treat as generic
  }
  // Check if it matches any solution
  return !solutionNames.some((solutionName) =>
    matchesSolution(caseArrayName, solutionName)
  );
}

/**
 * Get test cases for a specific solution
 */
function getTestCasesForSolution(
  module: any,
  solutionName: string,
  solutionNames: string[]
): any[] {
  const testCases: any[] = [];

  // Find all exported case arrays
  const caseArrayKeys = Object.keys(module).filter(
    (key) =>
      Array.isArray(module[key]) &&
      (key.toLowerCase().includes('case') || key === 'cases')
  );

  for (const caseArrayKey of caseArrayKeys) {
    const caseArray = module[caseArrayKey];

    // Check if this is a generic case array (runs for all solutions)
    if (isGenericCaseArray(caseArrayKey, solutionNames)) {
      testCases.push(...caseArray);
    }
    // Check if this case array matches the current solution
    else if (matchesSolution(caseArrayKey, solutionName)) {
      testCases.push(...caseArray);
    }
  }

  return testCases;
}

async function runSolutionTests(
  solveFunction: (...args: any[]) => any,
  cases: any[]
): Promise<TestResult<any>[]> {
  const results: TestResult<any>[] = [];

  for (const testCase of cases) {
    const start = performance.now();
    let actual: any;
    let error: string | undefined;
    let passed = false;

    // For Zod function schemas, testCase.input should be an array where
    // each element corresponds to a function parameter
    // e.g., [[1,2,3,4,5]] means pass [1,2,3,4,5] as the first argument
    // When we spread it with ..., it becomes func([1,2,3,4,5])
    const args = Array.isArray(testCase.input)
      ? testCase.input
      : [testCase.input];

    try {
      // Execute the function - this will throw if Zod validation fails
      actual = solveFunction(...args);
      passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
    } catch (err) {
      // Check if it's a Zod validation error
      if (err && typeof err === 'object' && 'issues' in err) {
        error = JSON.stringify((err as any).issues, null, 2);
      } else {
        error = err instanceof Error ? err.message : String(err);
      }
      actual = undefined;
    }

    const duration = performance.now() - start;

    results.push({
      ...testCase,
      actual,
      passed,
      duration,
      error,
    });
  }

  return results;
}

async function runProblemTests(
  problemPath: string,
  content?: string
): Promise<{
  solutions: any[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
}> {
  const module = (await import(problemPath)) as any;
  const { solutions: solutionExports } = module;

  // Check if this is the new Zod function format
  if (solutionExports && Array.isArray(solutionExports)) {
    const solutions = [];

    // Get all solution names from module exports
    const allSolutionKeys = Object.keys(module).filter(
      (key) =>
        key !== 'solutions' &&
        key !== 'cases' &&
        key !== 'SolutionSchema' &&
        key !== 'meta' &&
        typeof module[key] === 'function' &&
        solutionExports.includes(module[key])
    );

    for (let i = 0; i < solutionExports.length; i++) {
      const solution = solutionExports[i];

      // Find the correct name for this solution by checking which key points to this function
      let solutionName = `solution${i + 1}`;
      for (const key of allSolutionKeys) {
        if (module[key] === solution) {
          solutionName = key;
          break;
        }
      }

      // Extract solution info from the function and source content
      const solutionInfo = await extractSolutionInfo(
        solution,
        solutionName,
        content,
        problemPath
      );

      // Get test cases specific to this solution
      const testCases = getTestCasesForSolution(
        module,
        solutionName,
        allSolutionKeys
      );

      // Run tests with the solution function
      const testResults = await runSolutionTests(solution, testCases);

      const totalTests = testResults.length;
      const passedTests = testResults.filter((r) => r.passed).length;
      const failedTests = totalTests - passedTests;

      solutions.push({
        ...solutionInfo,
        testResults: sanitizeTestCases(testResults),
        totalTests,
        passedTests,
        failedTests,
      });
    }

    const totalTests = solutions.reduce((sum, s) => sum + s.totalTests, 0);
    const passedTests = solutions.reduce((sum, s) => sum + s.passedTests, 0);
    const failedTests = totalTests - passedTests;

    return { solutions, totalTests, passedTests, failedTests };
  } else {
    // Legacy format - check for old solution format
    const solutionKeys = Object.keys(module).filter((key) =>
      key.startsWith('solution')
    );

    if (solutionKeys.length > 0) {
      // Old solution format
      const solutions = [];

      for (const solutionKey of solutionKeys) {
        const solution = module[solutionKey];

        // Create a temporary solve function from the solution's code
        const solveFunction = new Function('input', solution.code) as (
          ...args: any[]
        ) => any;

        // Get test cases for the legacy solution format
        const testCases = getTestCasesForSolution(
          module,
          solutionKey,
          solutionKeys
        );

        const testResults = await runSolutionTests(solveFunction, testCases);

        const totalTests = testResults.length;
        const passedTests = testResults.filter((r) => r.passed).length;
        const failedTests = totalTests - passedTests;

        solutions.push({
          ...solution,
          testResults: sanitizeTestCases(testResults),
          totalTests,
          passedTests,
          failedTests,
        });
      }

      const totalTests = solutions.reduce((sum, s) => sum + s.totalTests, 0);
      const passedTests = solutions.reduce((sum, s) => sum + s.passedTests, 0);
      const failedTests = totalTests - passedTests;

      return { solutions, totalTests, passedTests, failedTests };
    } else {
      // Legacy format with single solve function
      const { solve } = module;

      // Attempt to find test cases for the legacy single solve function (assume 'testCases' or similar key)
      // Fallback to empty array if not found
      const testCases =
        module.testCases ||
        module.cases ||
        (typeof getTestCasesForSolution === 'function'
          ? getTestCasesForSolution(module, 'solution', ['solution'])
          : []);

      const testResults = await runSolutionTests(solve, testCases);

      const totalTests = testResults.length;
      const passedTests = testResults.filter((r) => r.passed).length;
      const failedTests = totalTests - passedTests;

      // Create a single solution from the legacy format
      const solutions = [
        {
          name: 'Solution',
          description: 'Main solution',
          approach: 'Add your approach here',
          timeComplexity: 'O()',
          spaceComplexity: 'O()',
          code: solve.toString(),
          testResults: sanitizeTestCases(testResults),
          totalTests,
          passedTests,
          failedTests,
        },
      ];

      return { solutions, totalTests, passedTests, failedTests };
    }
  }
}

/**
 * Parse import statements to find where a utility is imported from
 */
function findUtilityImport(
  sourceContent: string,
  utilityName: string
): { importPath: string; isNamedImport: boolean } | null {
  // Match both named and default imports
  // Pattern: import { utilityName } from 'path' or import utilityName from 'path'
  const namedImportRegex = new RegExp(
    `import\\s+\\{[^}]*\\b${utilityName}\\b[^}]*\\}\\s+from\\s+['"]([^'"]+)['"]`,
    'g'
  );
  const defaultImportRegex = new RegExp(
    `import\\s+${utilityName}\\s+from\\s+['"]([^'"]+)['"]`,
    'g'
  );

  // Try named import first
  let match = namedImportRegex.exec(sourceContent);
  if (match) {
    return { importPath: match[1], isNamedImport: true };
  }

  // Try default import
  match = defaultImportRegex.exec(sourceContent);
  if (match) {
    return { importPath: match[1], isNamedImport: false };
  }

  return null;
}

/**
 * Resolve import path to actual file path
 */
function resolveImportPath(
  importPath: string,
  fromFile: string
): string | null {
  const fromDir = dirname(fromFile);
  const projectRoot = process.cwd();

  // Handle relative imports
  if (importPath.startsWith('.')) {
    // Remove .js extension if present (TypeScript allows importing .ts files with .js extension)
    const pathWithoutExt = importPath.replace(/\.js$/, '');
    const resolvedPath = join(fromDir, pathWithoutExt);

    // Try .ts extension first
    if (existsSync(`${resolvedPath}.ts`)) {
      return `${resolvedPath}.ts`;
    }
    // Try .js extension
    if (existsSync(`${resolvedPath}.js`)) {
      return `${resolvedPath}.js`;
    }
    // Try as directory with index
    if (existsSync(join(resolvedPath, 'index.ts'))) {
      return join(resolvedPath, 'index.ts');
    }
    if (existsSync(join(resolvedPath, 'index.js'))) {
      return join(resolvedPath, 'index.js');
    }
  }

  // Handle absolute imports from project root (e.g., starting with /)
  if (importPath.startsWith('/')) {
    const pathWithoutExt = importPath.slice(1).replace(/\.js$/, '');
    const resolvedPath = join(projectRoot, pathWithoutExt);

    if (existsSync(`${resolvedPath}.ts`)) {
      return `${resolvedPath}.ts`;
    }
    if (existsSync(`${resolvedPath}.js`)) {
      return `${resolvedPath}.js`;
    }
  }

  // Handle imports from shared/ or other directories relative to project root
  const pathWithoutExt = importPath.replace(/\.js$/, '');
  const resolvedPath = join(projectRoot, pathWithoutExt);

  if (existsSync(`${resolvedPath}.ts`)) {
    return `${resolvedPath}.ts`;
  }
  if (existsSync(`${resolvedPath}.js`)) {
    return `${resolvedPath}.js`;
  }

  return null;
}

function extractUtilityDefinition(
  sourceContent: string,
  utilityName: string
): string | null {
  let result: string | null = null;
  // Try to find type definitions first
  const typeRegex = new RegExp(
    `export\\s+type\\s+${utilityName}\\s*=\\s*([^;]+);`,
    'g'
  );
  const typeMatch = typeRegex.exec(sourceContent);
  if (typeMatch) {
    result = `type ${utilityName} = ${typeMatch[1].trim()};`;
  }

  // Try to find interface definitions
  const interfaceRegex = new RegExp(
    `export\\s+interface\\s+${utilityName}\\s*\\{([\\s\\S]*?)\\}\\s*`,
    'g'
  );
  const interfaceMatch = interfaceRegex.exec(sourceContent);
  if (interfaceMatch) {
    result = `interface ${utilityName} {${interfaceMatch[1]}}`;
  }

  // Try to find const/let/var definitions
  const constRegex = new RegExp(
    `export\\s+const\\s+${utilityName}\\s*=\\s*([^;]+);`,
    'g'
  );
  const constMatch = constRegex.exec(sourceContent);
  if (constMatch) {
    result = `const ${utilityName} = ${constMatch[1].trim()};`;
  }

  // Try to find function definitions
  const functionRegex = new RegExp(
    `export\\s+function\\s+${utilityName}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\}\\s*`,
    'g'
  );
  const functionMatch = functionRegex.exec(sourceContent);
  if (functionMatch) {
    result = `function ${utilityName}() {${functionMatch[1]}}`;
  }

  // Try to find Zod schema definitions
  const zodRegex = new RegExp(
    `export\\s+const\\s+${utilityName}\\s*:\\s*z\\.[^=]+=\\s*([^;]+);`,
    'g'
  );
  const zodMatch = zodRegex.exec(sourceContent);
  if (zodMatch) {
    result = `const ${utilityName}: z.ZodType = ${zodMatch[1].trim()};`;
  }

  // Try to find class definitions (with proper brace matching)
  const classStartRegex = new RegExp(
    `export\\s+class\\s+${utilityName}\\s*[^{]*\\{`,
    'g'
  );
  const classStartMatch = classStartRegex.exec(sourceContent);
  if (classStartMatch) {
    const startIndex = classStartMatch.index + classStartMatch[0].length - 1; // -1 to include the opening brace
    let braceCount = 1;
    let endIndex = startIndex + 1;

    for (let i = startIndex + 1; i < sourceContent.length; i++) {
      if (sourceContent[i] === '{') braceCount++;
      else if (sourceContent[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }

    const classBody = sourceContent.substring(startIndex + 1, endIndex).trim();
    result = `class ${utilityName} {\n${classBody}\n}`;
  }

  return result;
}

async function extractSolutionInfo(
  solutionFunction: (...args: any[]) => any,
  functionName?: string,
  sourceContent?: string,
  problemFilePath?: string
): Promise<{
  name: string;
  description: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  utilities: Array<{ name: string; code: string }>;
}> {
  const functionString = solutionFunction.toString();

  // Try to extract info from JSDoc comments above the function
  const name = functionName || 'Solution';
  const description = '';
  let approach = 'Add your approach here';
  let timeComplexity = 'O()';
  let spaceComplexity = 'O()';

  // Extract from source content if available
  if (sourceContent && functionName) {
    // Find all JSDoc comments and their corresponding functions
    // Match any schema name (SolutionSchema, Problem1Schema, etc.)
    const allMatches = sourceContent.matchAll(
      /\/\*\*([\s\S]*?)\*\/\s*export\s+const\s+(\w+)\s*=\s*\w+Schema\.implement/g
    );

    let jsdoc = null;
    for (const match of allMatches) {
      if (match[2] === functionName) {
        jsdoc = match[1];
        break;
      }
    }

    if (jsdoc) {
      // Extract approach
      const approachMatch = jsdoc.match(
        /\*\s*Approach:\s*([\s\S]*?)(?:\*\s*(?:Time|Space|$))/
      );
      if (approachMatch) {
        approach = approachMatch[1].replace(/\*\s*/g, '').trim();
      }

      // Extract time complexity
      const timeMatch = jsdoc.match(/\*\s*Time Complexity:\s*([^\n\r]+)/);
      if (timeMatch) {
        timeComplexity = timeMatch[1].trim();
      }

      // Extract space complexity
      const spaceMatch = jsdoc.match(/\*\s*Space Complexity:\s*([^\n\r]+)/);
      if (spaceMatch) {
        spaceComplexity = spaceMatch[1].trim();
      }
    }
  }

  // Extract utilities from @utilities JSDoc tag
  const utilities: Array<{ name: string; code: string }> = [];
  if (sourceContent && functionName) {
    // Find all JSDoc comments and their corresponding functions
    // Match any schema name (SolutionSchema, Problem1Schema, etc.)
    const allMatches = sourceContent.matchAll(
      /\/\*\*([\s\S]*?)\*\/\s*export\s+const\s+(\w+)\s*=\s*\w+Schema\.implement/g
    );

    let jsdoc = null;
    for (const match of allMatches) {
      if (match[2] === functionName) {
        jsdoc = match[1];
        break;
      }
    }

    if (jsdoc) {
      // Extract utilities from @utilities tag
      const utilitiesMatch = jsdoc.match(/\*\s*@utilities:\s*([^\n\r]+)/);
      if (utilitiesMatch) {
        const utilityNames = utilitiesMatch[1]
          .split(',')
          .map((name) => name.trim());

        for (const utilityName of utilityNames) {
          let utilityCode: string | null = null;

          // First, try to find if the utility is imported from another file
          if (problemFilePath) {
            const importInfo = findUtilityImport(sourceContent, utilityName);

            if (importInfo) {
              const resolvedPath = resolveImportPath(
                importInfo.importPath,
                problemFilePath
              );

              if (resolvedPath && existsSync(resolvedPath)) {
                try {
                  const utilityFileContent = readFileSync(
                    resolvedPath,
                    'utf-8'
                  );
                  utilityCode = extractUtilityDefinition(
                    utilityFileContent,
                    utilityName
                  );
                } catch (error) {
                  console.warn(
                    `Failed to read utility file ${resolvedPath}:`,
                    error
                  );
                }
              }
            }

            // If not found via import, try common utility locations
            if (!utilityCode) {
              const projectRoot = process.cwd();
              const commonPaths = [
                join(projectRoot, 'shared', 'list-node.ts'),
                join(projectRoot, 'shared', `${utilityName.toLowerCase()}.ts`),
                join(projectRoot, 'shared', 'index.ts'),
              ];

              for (const commonPath of commonPaths) {
                if (existsSync(commonPath)) {
                  try {
                    const utilityFileContent = readFileSync(
                      commonPath,
                      'utf-8'
                    );
                    utilityCode = extractUtilityDefinition(
                      utilityFileContent,
                      utilityName
                    );
                    if (utilityCode) {
                      break; // Found it, stop searching
                    }
                  } catch (error) {
                    // Continue to next path
                  }
                }
              }
            }
          }

          // If not found in imports or common locations, try to find in the current file
          if (!utilityCode) {
            utilityCode = extractUtilityDefinition(sourceContent, utilityName);
          }

          if (utilityCode) {
            utilities.push({ name: utilityName, code: utilityCode });
          } else {
            console.warn(
              `Could not find utility definition for ${utilityName} in ${problemFilePath || 'current file'}`
            );
          }
        }
      }
    }
  }

  // Extract the actual implementation code from the source content if available
  let actualCode = functionString;

  if (sourceContent && functionName) {
    const escapedFunctionName = functionName.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );

    // Find the start of the implementation
    const startPattern = new RegExp(
      `export\\s+const\\s+${escapedFunctionName}\\s*=\\s*\\w+Schema\\.implement\\s*\\(\\s*\\(([^)]*)\\)\\s*=>\\s*`
    );
    const startMatch = sourceContent.match(startPattern);

    if (startMatch) {
      const params = startMatch[1];
      const startIndex = startMatch.index! + startMatch[0].length;

      // Check if it's an expression form (no opening brace)
      if (sourceContent[startIndex] !== '{') {
        // Expression form: (params) => expression
        // Find the closing );
        let depth = 1; // We're inside the .implement( already
        let endIndex = startIndex;

        for (let i = startIndex; i < sourceContent.length; i++) {
          if (sourceContent[i] === '(') depth++;
          else if (sourceContent[i] === ')') {
            depth--;
            if (depth === 0) {
              endIndex = i;
              break;
            }
          }
        }

        const expression = sourceContent.substring(startIndex, endIndex).trim();
        // Wrap expression in braces with return
        actualCode = `const ${functionName} = (${params}) => {\n  return ${expression};\n};`;
      } else {
        // Block form: (params) => { body }
        // Use brace counting to find the matching closing brace
        let braceCount = 1; // We're already inside the opening brace
        let endIndex = startIndex + 1;

        for (let i = startIndex + 1; i < sourceContent.length; i++) {
          if (sourceContent[i] === '{') braceCount++;
          else if (sourceContent[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              endIndex = i;
              break;
            }
          }
        }

        const body = sourceContent.substring(startIndex + 1, endIndex).trim();
        actualCode = `const ${functionName} = (${params}) => {\n${body}\n};`;
      }
    }
  }

  // Format the code with Prettier for consistent, clean output
  const formattedCode = await formatTypeScriptCode(actualCode);

  return {
    name,
    description,
    approach,
    timeComplexity,
    spaceComplexity,
    code: formattedCode,
    utilities,
  };
}

export async function buildData(options: BuildDataOptions) {
  console.log('Building data for website...');
  console.log('Current working directory:', process.cwd());

  try {
    // Create output directory
    const outputDir = join(process.cwd(), 'dist', 'data');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Configure marked with extensions
    marked.use(markedCodeFormat(prettierConfig));
    marked.use(
      markedHighlight({
        highlight: (code: string, lang: string) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
              console.warn(
                `Failed to highlight code with language ${lang}:`,
                err
              );
            }
          }
          // Fallback to auto-detection
          try {
            return hljs.highlightAuto(code).value;
          } catch (err) {
            console.warn('Failed to auto-highlight code:', err);
            return code;
          }
        },
      })
    );

    // Find all problem files
    const problemFiles = findProblemFiles('problems');
    console.log(`Found ${problemFiles.length} problem files:`, problemFiles);

    const problems: ProblemData[] = [];
    const indexData: IndexData = {
      problems: [],
      totalProblems: 0,
      difficultyCounts: { easy: 0, medium: 0, hard: 0 },
      tagCounts: {},
    };

    // Process each problem
    for (const filePath of problemFiles) {
      try {
        const fullPath = join(process.cwd(), filePath);
        const content = readFileSync(fullPath, 'utf-8');

        // Extract code and notes
        const { notes } = await extractCodeAndNotes(content);

        // Import the module
        const module = await import(fullPath);
        const { meta, cases } = module;

        // Handle new format without meta export
        let validatedMeta;
        if (meta) {
          validatedMeta = problemMetaSchema.parse(meta);
        } else {
          // Extract meta from TSDoc comment for new format
          validatedMeta = extractMetaFromTSDoc(content);
        }

        // Validate test cases (if cases export exists)
        // Note: Individual case arrays (e.g., problem1Cases) will be validated
        // when they are used in runProblemTests
        if (cases && Array.isArray(cases)) {
          cases.forEach((testCase: any) => {
            testCaseSchema.parse(testCase);
          });
        }

        // Run tests
        const { solutions, totalTests, passedTests, failedTests } =
          await runProblemTests(fullPath, content);

        // Process code for each solution using marked
        const processedSolutions = await Promise.all(
          solutions.map(async (solution) => ({
            ...solution,
            code: await marked.parse(
              `\`\`\`typescript\n${solution.code}\n\`\`\``
            ),
            utilities: await Promise.all(
              solution.utilities.map(async (utility: any) => ({
                ...utility,
                code: await marked.parse(
                  `\`\`\`typescript\n${utility.code}\n\`\`\``
                ),
              }))
            ),
          }))
        );

        // Create problem data
        const problemData: ProblemData = {
          ...validatedMeta,
          solutions: processedSolutions,
          notes,
          totalTests,
          passedTests,
          failedTests,
        };

        problems.push(problemData);
        indexData.problems.push(validatedMeta);
        indexData.difficultyCounts[validatedMeta.difficulty as Difficulty]++;

        // Count tags
        validatedMeta.tags.forEach((tag: string) => {
          indexData.tagCounts[tag] = (indexData.tagCounts[tag] || 0) + 1;
        });

        console.log(
          `✅ Processed: ${validatedMeta.id} - ${validatedMeta.title}`
        );
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error);
      }
    }

    // Sort problems by ID
    problems.sort((a, b) => a.id - b.id);
    indexData.problems.sort((a, b) => a.id - b.id);
    indexData.totalProblems = problems.length;

    // Write individual problem files
    for (const problem of problems) {
      const problemFile = join(outputDir, 'problems', `${problem.slug}.json`);
      mkdirSync(dirname(problemFile), { recursive: true });
      writeFileSync(problemFile, JSON.stringify(problem, null, 2));
    }

    // Write index file
    writeFileSync(
      join(outputDir, 'index.json'),
      JSON.stringify(indexData, null, 2)
    );

    // Also copy to site's src directory for Astro to access
    const siteDataDir = join(process.cwd(), 'apps', 'site', 'src', 'data');
    mkdirSync(siteDataDir, { recursive: true });

    // Copy index file
    writeFileSync(
      join(siteDataDir, 'index.json'),
      JSON.stringify(indexData, null, 2)
    );

    // Copy problem files
    const siteProblemsDir = join(siteDataDir, 'problems');
    mkdirSync(siteProblemsDir, { recursive: true });

    for (const problem of problems) {
      const problemFile = join(siteProblemsDir, `${problem.slug}.json`);
      writeFileSync(problemFile, JSON.stringify(problem, null, 2));
    }

    console.log(`✅ Built data for ${problems.length} problems`);
    console.log(`📁 Output directory: ${outputDir}`);

    if (options.watch) {
      console.log('👀 Watching for changes...');
      // TODO: Implement file watching
    }
  } catch (error) {
    console.error('Error building data:', error);
    throw error;
  }
}

async function extractCodeAndNotes(
  content: string
): Promise<{ code: string; notes: string }> {
  // Extract TSDoc comment (between /** and */)
  const tsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  const rawNotes = tsdocMatch ? tsdocMatch[1].trim() : '';

  // Clean up excessive newlines before processing
  let cleanedNotes = rawNotes
    .replace(/^\s*\n/g, '') // Remove leading empty lines
    .replace(/\n\s*$/g, '') // Remove trailing empty lines
    .trim();

  // Convert "Image: URL" format to markdown image syntax
  // Pattern: *    Image: https://example.com/image.png
  // Replace with: ![Example image](https://example.com/image.png)
  cleanedNotes = cleanedNotes.replace(/\*\s+Image:\s+(\S+)/g, (match, url) => {
    // Extract example number if available (from previous lines)
    const exampleMatch = cleanedNotes
      .substring(0, cleanedNotes.indexOf(match))
      .match(/\*\s+(\d+)\.\s+Input:/);
    const exampleNum = exampleMatch ? exampleMatch[1] : '';
    const altText = exampleNum
      ? `Example ${exampleNum} image`
      : 'Example image';
    return `*\n * ![${altText}](${url})`;
  });

  // Process markdown to HTML
  const notes = cleanedNotes
    ? await marked.parse(cleanedNotes, {
        breaks: true,
        gfm: true,
      })
    : '';

  // For the new format, we don't need to extract code here since
  // the actual solution code is in the exported functions
  // This function is mainly for the notes extraction
  const code = ''; // Code will be extracted from individual solution functions

  return { code, notes };
}

function extractMetaFromTSDoc(content: string): any {
  // Extract TSDoc comment (between /** and */)
  const tsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!tsdocMatch) {
    throw new Error('No TSDoc comment found');
  }

  const tsdoc = tsdocMatch[1];

  // Extract problem number and title
  const titleMatch = tsdoc.match(/\*\s*(\d+)\.\s*(.+)/);
  if (!titleMatch) {
    throw new Error('Could not extract problem number and title');
  }

  const id = parseInt(titleMatch[1]);
  const title = titleMatch[2].trim();

  // Extract difficulty
  const difficultyMatch = tsdoc.match(/\*\s*Difficulty:\s*(\w+)/);
  const difficulty = difficultyMatch ? difficultyMatch[1] : 'easy';

  // Extract tags
  const tagsMatch = tsdoc.match(/\*\s*Tags:\s*(.+)/);
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map((tag) => tag.trim())
    : [];

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return {
    id,
    slug,
    title,
    tags,
    difficulty,
  };
}

// Run the build if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildData({}).catch(console.error);
}
