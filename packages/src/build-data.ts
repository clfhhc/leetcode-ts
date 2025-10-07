import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { getHighlighter } from 'shiki';
import { marked } from 'marked';
import type { ProblemData, IndexData, TestResult } from './types.js';
import { problemMetaSchema, testCaseSchema } from './types.js';

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

async function runSolutionTests(solveFunction: Function, cases: any[]): Promise<TestResult<any>[]> {
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

async function runProblemTests(problemPath: string): Promise<{ solutions: any[], totalTests: number, passedTests: number, failedTests: number }> {
  const module = await import(problemPath) as any;
  const { cases, solutions: solutionExports } = module;
  
  // Check if this is the new Zod function format
  if (solutionExports && Array.isArray(solutionExports)) {
    const solutions = [];
    
    for (const solution of solutionExports) {
      // Extract solution info from the function
      const solutionInfo = extractSolutionInfo(solution);
      
      // Run tests with the solution function
      const testResults = await runSolutionTests(solution, cases);
      
      const totalTests = testResults.length;
      const passedTests = testResults.filter(r => r.passed).length;
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
    const solutionKeys = Object.keys(module).filter(key => key.startsWith('solution'));
    
    if (solutionKeys.length > 0) {
      // Old solution format
      const solutions = [];
      
      for (const solutionKey of solutionKeys) {
        const solution = module[solutionKey];
        
        // Create a temporary solve function from the solution's code
        const solveFunction = new Function('input', solution.code);
        
        const testResults = await runSolutionTests(solveFunction, cases);
        
        const totalTests = testResults.length;
        const passedTests = testResults.filter(r => r.passed).length;
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
      const passedTests = testResults.filter(r => r.passed).length;
      const failedTests = totalTests - passedTests;
      
      // Create a single solution from the legacy format
      const solutions = [{
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
      }];
      
      return { solutions, totalTests, passedTests, failedTests };
    }
  }
}

function extractSolutionInfo(solutionFunction: Function): { name: string; description: string; approach: string; timeComplexity: string; spaceComplexity: string; code: string } {
  const functionString = solutionFunction.toString();
  
  // Try to extract info from JSDoc comments above the function
  // This is a simplified extraction - in practice, you might want more sophisticated parsing
  const name = 'Solution'; // Default name
  const description = 'Solution implementation';
  const approach = 'Add your approach here';
  const timeComplexity = 'O()';
  const spaceComplexity = 'O()';
  
  return {
    name,
    description,
    approach,
    timeComplexity,
    spaceComplexity,
    code: functionString,
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

  // Initialize syntax highlighter
  const highlighter = await getHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['typescript', 'javascript'],
  });

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
      const { code, notes } = extractCodeAndNotes(content);
      
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
      const { solutions, totalTests, passedTests, failedTests } = await runProblemTests(fullPath);
      
      // Highlight code for each solution
      const highlightedSolutions = solutions.map(solution => ({
        ...solution,
        code: highlighter.codeToHtml(solution.code, { lang: 'typescript' }),
      }));

      // Create problem data
      const problemData: ProblemData = {
        ...validatedMeta,
        solutions: highlightedSolutions,
        notes,
        totalTests,
        passedTests,
        failedTests,
      };

      problems.push(problemData);
      indexData.problems.push(validatedMeta);
      indexData.difficultyCounts[validatedMeta.difficulty]++;
      
      // Count tags
      validatedMeta.tags.forEach(tag => {
        indexData.tagCounts[tag] = (indexData.tagCounts[tag] || 0) + 1;
      });

      console.log(`✅ Processed: ${validatedMeta.id} - ${validatedMeta.title}`);
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
  writeFileSync(join(outputDir, 'index.json'), JSON.stringify(indexData, null, 2));

  // Also copy to site's src directory for Astro to access
  const siteDataDir = join(process.cwd(), 'apps', 'site', 'src', 'data');
  mkdirSync(siteDataDir, { recursive: true });
  
  // Copy index file
  writeFileSync(join(siteDataDir, 'index.json'), JSON.stringify(indexData, null, 2));
  
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

function extractCodeAndNotes(content: string): { code: string; notes: string } {
  // Extract TSDoc comment (between /** and */)
  const tsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  const rawNotes = tsdocMatch ? tsdocMatch[1].trim() : '';
  
  // Process markdown to HTML
  const notes = rawNotes ? marked(rawNotes) : '';

  // Extract code (everything after the first */)
  const codeStart = content.indexOf('*/') + 2;
  const code = content.slice(codeStart).trim();

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
  const tags = tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim()) : [];
  
  // Generate slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
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
