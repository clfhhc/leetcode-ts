import { describe, it, expect } from 'vitest';
import type { TestCase, TestResult } from './types.js';

export interface ProblemModule<
  T extends (...args: any[]) => any = (...args: any[]) => any,
> {
  solutions: T[];
  cases: TestCase<T>[];
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

/**
 * Resolve input/expected values - if they're functions, call them to get fresh values
 */
function resolveValue<T>(value: T | (() => T)): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export async function runProblemTests(
  problemPath: string
): Promise<{ [solutionName: string]: TestResult[] }> {
  const module = (await import(problemPath)) as any;
  const { solutions } = module;
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

    // Get test cases specific to this solution
    const testCases = getTestCasesForSolution(
      module,
      solutionName,
      solutionNames
    );

    for (const testCase of testCases) {
      const start = performance.now();
      // Resolve input and expected (call functions if provided)
      const input = resolveValue(testCase.input);
      const expected = resolveValue(testCase.expected);

      let actual: any;
      let error: string | undefined;
      let passed = false;

      try {
        // Handle both array and individual parameter formats
        if (Array.isArray(input)) {
          actual = solution(...input);
        } else {
          actual = solution(input);
        }
        passed = JSON.stringify(actual) === JSON.stringify(expected);
      } catch (err) {
        error = err instanceof Error ? err.message : String(err);
        actual = undefined;
      }

      const duration = performance.now() - start;

      solutionResults.push({
        ...testCase,
        input,
        expected,
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

export function createTestSuite(
  problemPath: string,
  module: any,
  filterSolution?: string
) {
  const { solutions } = module;

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
        // Get test cases specific to this solution
        const testCases = getTestCasesForSolution(
          module,
          solutionName,
          solutionNames
        );

        for (const testCase of testCases) {
          // Resolve input and expected (call functions if provided)
          const input = resolveValue(testCase.input);
          const expected = resolveValue(testCase.expected);

          const name = testCase.name ?? JSON.stringify(input).slice(0, 80);
          const fn = testCase.only ? it.only : testCase.skip ? it.skip : it;

          fn(name, () => {
            let actual: any;

            // Handle both array and individual parameter formats
            if (Array.isArray(input)) {
              actual = solution(...input);
            } else {
              actual = solution(input);
            }

            expect(actual).toEqual(expected);
          });
        }
      });
    }
  });
}
