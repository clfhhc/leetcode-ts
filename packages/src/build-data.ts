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

    try {
      // Handle both array and individual parameter formats
      if (Array.isArray(testCase.input)) {
        actual = solveFunction(...testCase.input);
      } else {
        actual = solveFunction(testCase.input);
      }
      passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
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
  const { cases, solutions: solutionExports } = module;

  // Check if this is the new Zod function format
  if (solutionExports && Array.isArray(solutionExports)) {
    const solutions = [];

    // Get solution names from module exports
    const solutionNames = Object.keys(module).filter(
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
      const solutionName = solutionNames[i] || `solution${i + 1}`;

      // Extract solution info from the function and source content
      const solutionInfo = extractSolutionInfo(solution, solutionName, content);

      // Run tests with the solution function
      const testResults = await runSolutionTests(solution, cases);

      const totalTests = testResults.length;
      const passedTests = testResults.filter((r) => r.passed).length;
      const failedTests = totalTests - passedTests;

      solutions.push({
        ...solutionInfo,
        testResults,
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

        const testResults = await runSolutionTests(solveFunction, cases);

        const totalTests = testResults.length;
        const passedTests = testResults.filter((r) => r.passed).length;
        const failedTests = totalTests - passedTests;

        solutions.push({
          ...solution,
          testResults,
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
      const testResults = await runSolutionTests(solve, cases);

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
          testResults,
          totalTests,
          passedTests,
          failedTests,
        },
      ];

      return { solutions, totalTests, passedTests, failedTests };
    }
  }
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

  // Try to find class definitions
  const classRegex = new RegExp(
    `export\\s+class\\s+${utilityName}\\s*\\{([\\s\\S]*?)\\}\\s*`,
    'g'
  );
  const classMatch = classRegex.exec(sourceContent);
  if (classMatch) {
    result = `class ${utilityName} {${classMatch[1]}}`;
  }

  return result;
}

function extractSolutionInfo(
  solutionFunction: (...args: any[]) => any,
  functionName?: string,
  sourceContent?: string
): {
  name: string;
  description: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  utilities: Array<{ name: string; code: string }>;
} {
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
    const allMatches = sourceContent.matchAll(
      /\/\*\*([\s\S]*?)\*\/\s*export\s+const\s+(\w+)\s*=\s*SolutionSchema\.implement/g
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
    const allMatches = sourceContent.matchAll(
      /\/\*\*([\s\S]*?)\*\/\s*export\s+const\s+(\w+)\s*=\s*SolutionSchema\.implement/g
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
          const utilityCode = extractUtilityDefinition(
            sourceContent,
            utilityName
          );
          if (utilityCode) {
            utilities.push({ name: utilityName, code: utilityCode });
          }
        }
      }
    }
  }

  // Extract the actual implementation code from the source content if available
  let actualCode = functionString;

  if (sourceContent && functionName) {
    // Look for the actual implementation in the source content
    const escapedFunctionName = functionName.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );
    const regex = new RegExp(
      `export\\s+const\\s+${escapedFunctionName}\\s*=\\s*SolutionSchema\\.implement\\(([^)]*\\)\\s*=>\\s*\\{[\\s\\S]*?\\})\\s*\\);`
    );
    let implementationMatch = sourceContent.match(regex);
    if (!implementationMatch) {
      // Fallback: try to extract from function string
      implementationMatch = functionString.match(
        /SolutionSchema\.implement\((\([^)]*\)\s*=>\s*\{[\s\S]*\}\);)/
      );
    }
    if (implementationMatch) {
      actualCode = `const ${functionName} = ${implementationMatch[1]};`;
    }
  }

  return {
    name,
    description,
    approach,
    timeComplexity,
    spaceComplexity,
    code: actualCode,
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

        // Validate test cases
        cases.forEach((testCase: any) => {
          testCaseSchema.parse(testCase);
        });

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
              solution.utilities.map(async (utility) => ({
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
  const cleanedNotes = rawNotes
    .replace(/^\s*\n/g, '') // Remove leading empty lines
    .replace(/\n\s*$/g, '') // Remove trailing empty lines
    .trim();

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
