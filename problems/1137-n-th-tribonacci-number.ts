/**
 * 1137. N-th Tribonacci Number
 *
 * Difficulty: easy
 * Tags: math, dynamic-programming, memoization
 *
 * Description:
 * The Tribonacci sequence T_n is defined as follows:
 *
 * T_0 = 0, T_1 = 1, T_2 = 1, and T_n+3 = T_n + T_n+1 + T_n+2 for n >= 0.
 *
 * Given `n`, return the value of T_n.
 *
 * Examples:
 * 1. Input: n = 4
 *    Output: 4
 *    Explanation: T\_3 = 0 + 1 + 1 = 2 T\_4 = 1 + 1 + 2 = 4
 * 2. Input: n = 25
 *    Output: 1389537
 *
 * Constraints:
 * - `0 <= n <= 37`
 * - The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.number()],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  { input: [4], expected: 4, name: 'Example 1' },
  { input: [25], expected: 1389537, name: 'Example 2' },
];

/**
 * Memoization and Recursive Solution
 * Approach: Memoization and Recursive
 *   - We use a memoization array to store the results of the previous tribonacci numbers
 *   - We then use an recursive approach to calculate the nth tribonacci number
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const memoizationRecursiveSolution = SolutionSchema.implement((n) => {
  const result = new Array(n);
  result[0] = 0;
  result[1] = 1;
  result[2] = 1;
  function nthTribonacci(n: number): number {
    if (n <= 2) {
      return result[n];
    }
    return nthTribonacci(n - 1) + nthTribonacci(n - 2) + nthTribonacci(n - 3);
  }
  return nthTribonacci(n);
});

/**
 * Memoization and Iterative Solution
 * Approach: Memoization and Iterative
 *   - We use a memoization array to store the results of the previous tribonacci numbers
 *   - We then use an iterative approach to calculate the nth tribonacci number
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const memoizationIterativeSolution = SolutionSchema.implement((n) => {
  const result = new Array(n);
  result[0] = 0;
  result[1] = 1;
  result[2] = 1;
  for (let i = 3; i <= n; i += 1) {
    result[i] = result[i - 3] + result[i - 2] + result[i - 1];
  }
  return result[n];
});

/**
 * Matrix Solution
 * Approach:
 *   - We use a matrix to represent the tribonacci sequence
 *   - We then use a matrix exponentiation to calculate the nth tribonacci number
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const matrixSolution = SolutionSchema.implement((n) => {
  function multiplyMatrixInPlace(m1: number[][], m2: number[][]): number[][] {
    const c = Array.from({ length: m1.length }, () =>
      new Array(m2[0].length).fill(0)
    );
    for (let i = 0; i < m1.length; i += 1) {
      for (let j = 0; j < m2[0].length; j += 1) {
        for (let k = 0; k < m2.length; k += 1) {
          c[i][j] += m1[i][k] * m2[k][j];
        }
      }
    }
    for (let i = 0; i < c.length; i += 1) {
      for (let j = 0; j < c.length; j += 1) {
        m1[i][j] = c[i][j];
      }
    }
    return m1;
  }

  function matrixPowerInPlace(m: number[][], power: number): number[][] {
    const ans = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    if (power === 0) {
      return ans;
    }
    while (power > 0) {
      if (power & 1) {
        multiplyMatrixInPlace(ans, m);
      }
      multiplyMatrixInPlace(m, m);
      power >>= 1;
    }
    return ans;
  }

  function nthTribonacci(n: number): number {
    const F = [
      [1, 0, 0],
      [1, 0, 0],
      [0, 0, 0],
    ];
    if (n <= 2) {
      return F[2 - n][0];
    }
    const M = [
      [1, 1, 1],
      [1, 0, 0],
      [0, 1, 0],
    ];
    const result = matrixPowerInPlace(M, n - 2);
    return multiplyMatrixInPlace(result, F)[0][0];
  }

  return nthTribonacci(n);
});

export const solutions = [
  memoizationRecursiveSolution,
  memoizationIterativeSolution,
  matrixSolution,
];
