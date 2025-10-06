import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { glob } from 'glob';
import { createHighlighter } from 'shiki';
import { runProblemTests } from './runner.js';
import type { ProblemData, IndexData, ProblemMeta } from './types.js';
import { problemMetaSchema, testCaseSchema } from './types.js';

export interface BuildDataOptions {
  watch?: boolean;
}

export async function buildData(options: BuildDataOptions) {
  console.log('Building data for website...');

  // Create output directory
  const outputDir = join(process.cwd(), 'dist', 'data');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Initialize syntax highlighter
  const highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['typescript', 'javascript'],
  });

  // Find all problem files
  const problemFiles = await glob('problems/**/*.ts', { cwd: process.cwd() });
  console.log(`Found ${problemFiles.length} problem files`);

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

  console.log(`✅ Built data for ${problems.length} problems`);
  console.log(`📁 Output directory: ${outputDir}`);

  if (options.watch) {
    console.log('👀 Watching for changes...');
    // TODO: Implement file watching
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
