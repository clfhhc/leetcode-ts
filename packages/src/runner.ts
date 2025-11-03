import { describe, it, expect } from 'vitest';
import type { TestCase, TestResult } from './types.js';

export interface ProblemModule<
  T extends (...args: any[]) => any = (...args: any[]) => any,
> {
  solutions: T[];
  cases: TestCase<T>[];
}

export async function runProblemTests(
  problemPath: string
): Promise<{ [solutionName: string]: TestResult[] }> {
  const module = (await import(problemPath)) as any;
  const { solutions, cases } = module;
  const results: { [solutionName: string]: TestResult[] } = {};

  // Get solution names from module exports
  const solutionNames = Object.keys(module).filter(
    (key) =>
      key !== 'solutions' &&
      key !== 'cases' &&
      key !== 'SolutionSchema' &&
      typeof module[key] === 'function' &&
      solutions.includes(module[key])
  );

  for (let i = 0; i < solutions.length; i++) {
    const solution = solutions[i];
    const solutionName = solutionNames[i] || `solution${i + 1}`;
    const solutionResults: TestResult[] = [];

    for (const testCase of cases) {
      const start = performance.now();
      let actual: any;
      let error: string | undefined;
      let passed = false;

      try {
        // Handle both array and individual parameter formats
        if (Array.isArray(testCase.input)) {
          actual = solution(...testCase.input);
        } else {
          actual = solution(testCase.input);
        }
        passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
      } catch (err) {
        error = err instanceof Error ? err.message : String(err);
        actual = undefined;
      }

      const duration = performance.now() - start;

      solutionResults.push({
        ...testCase,
        actual,
        passed,
        duration,
        error,
      });
    }

    results[solutionName] = solutionResults;
  }

  return results;
}

export function createTestSuite(problemPath: string, module: any, filterSolution?: string) {
  const { solutions, cases } = module;

  // Extract problem info from the file path or module
  const problemName =
    problemPath.split('/').pop()?.replace('.ts', '') || 'Unknown Problem';

  // Get solution names from module exports
  const solutionNames = Object.keys(module).filter(
    (key) =>
      key !== 'solutions' &&
      key !== 'cases' &&
      key !== 'SolutionSchema' &&
      typeof module[key] === 'function' &&
      solutions.includes(module[key])
  );

  describe(problemName, () => {
    for (let i = 0; i < solutions.length; i++) {
      const solution = solutions[i];
      const solutionName = solutionNames[i] || `solution${i + 1}`;

      // Filter by solution name if specified
      if (filterSolution && solutionName !== filterSolution) {
        continue;
      }

      describe(solutionName, () => {
        for (const testCase of cases) {
          const name =
            testCase.name ?? JSON.stringify(testCase.input).slice(0, 80);
          const fn = testCase.only ? it.only : testCase.skip ? it.skip : it;

          fn(name, () => {
            let actual: any;

            // Handle both array and individual parameter formats
            if (Array.isArray(testCase.input)) {
              actual = solution(...testCase.input);
            } else {
              actual = solution(testCase.input);
            }

            expect(actual).toEqual(testCase.expected);
          });
        }
      });
    }
  });
}
