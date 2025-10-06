import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { getHighlighter } from 'shiki';
import type { ProblemData, IndexData, ProblemMeta, TestResult } from './types.js';
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

async function runProblemTests(problemPath: string): Promise<TestResult<any, any>[]> {
  const module = await import(problemPath) as any;
  const { solve, cases } = module;
  const results: TestResult<any, any>[] = [];

  for (const testCase of cases) {
    const start = performance.now();
    let actual: any;
    let error: string | undefined;
    let passed = false;

    try {
      actual = solve(testCase.input);
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
      const { meta, solve, cases } = module;

      // Validate meta
      const validatedMeta = problemMetaSchema.parse(meta);
      
      // Validate test cases
      cases.forEach((testCase: any) => {
        testCaseSchema.parse(testCase);
      });

      // Run tests
      const testResults = await runProblemTests(fullPath);
      
      // Calculate stats
      const totalTests = testResults.length;
      const passedTests = testResults.filter(r => r.passed).length;
      const failedTests = totalTests - passedTests;

      // Create problem data
      const problemData: ProblemData = {
        ...validatedMeta,
        code: highlighter.codeToHtml(code, { lang: 'typescript' }),
        notes,
        testResults,
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
  const notes = tsdocMatch ? tsdocMatch[1].trim() : '';

  // Extract code (everything after the first */)
  const codeStart = content.indexOf('*/') + 2;
  const code = content.slice(codeStart).trim();

  return { code, notes };
}

// Run the build if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildData({}).catch(console.error);
}
