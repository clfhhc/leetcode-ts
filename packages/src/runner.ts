import { describe, it, expect } from 'vitest';
import type { TestCase, TestResult } from './types.js';

export interface ProblemModule<T extends (...args: any[]) => any = (...args: any[]) => any> {
  meta: any;
  solutions: T[];
  cases: TestCase<T>[];
}

export async function runProblemTests(problemPath: string): Promise<TestResult[]> {
  const module = await import(problemPath) as ProblemModule;
  const { solve, cases } = module;
  const results: TestResult[] = [];

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

export function createTestSuite(problemPath: string, module: ProblemModule) {
  const { meta, solve, cases } = module;
  
  describe(`${meta?.id ?? '?'} ${meta?.title ?? problemPath}`, () => {
    for (const testCase of cases) {
      const name = testCase.name ?? JSON.stringify(testCase.input).slice(0, 80);
      const fn = testCase.only ? it.only : testCase.skip ? it.skip : it;
      
      fn(name, () => {
        const actual = solve(testCase.input);
        expect(actual).toEqual(testCase.expected);
      });
    }
  });
}
