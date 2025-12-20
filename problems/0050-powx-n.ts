/**
 * 0050. Pow(x, n)
 *
 * Difficulty: medium
 * Tags: math, recursion
 *
 * Description:
 * Implement [pow(x, n)](http://www.cplusplus.com/reference/valarray/pow/), which calculates `x` raised to the power `n` (i.e., `x^n`).
 *
 * Examples:
 * 1. Input: x = 2.00000, n = 10
 *    Output: 1024.00000
 * 2. Input: x = 2.10000, n = 3
 *    Output: 9.26100
 * 3. Input: x = 2.00000, n = -2
 *    Output: 0.25000
 *    Explanation: 2^\-2 = 1/2^2 = 1/4 = 0.25
 *
 * Constraints:
 * - `-100.0 < x < 100.0`
 * - `-2^31 <= n <= 2^31-1`
 * - `n` is an integer.
 * - Either `x` is not zero or `n > 0`.
 * - `-10^4 <= x^n <= 10^4`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.any(), z.number()],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [2.0, 10],
    expected: (solution, input) => {
      const result = solution(...input);
      return Math.abs(result - 1024.0) < 0.001;
    },
    name: 'Example 1',
  },
  {
    input: [2.1, 3],
    expected: (solution, input) => {
      const result = solution(...input);
      return Math.abs(result - 9.261) < 0.001;
    },
    name: 'Example 2',
  },
  {
    input: [2.0, -2],
    expected: (solution, input) => Math.abs(solution(...input) - 0.25) < 0.001,
    name: 'Example 3',
  },
  {
    input: [2.0, -200000000],
    expected: (solution, input) => {
      const result = solution(...input);
      return Math.abs(result - 2.0 ** -200000000) < 0.001;
    },
    name: 'Example 4',
  },
];

/**
 * Recursive Solution
 * Approach:
 *   - Use a recursive function to calculate the power of x to the power of n
 *   - If x is 0 and n is less than or equal to 0, return NaN
 *   - If x is 0, return 0
 *   - If n is 1, return x
 *   - If n is negative, return 1 / x to the power of -n
 *   - Otherwise, return x to the power of n
 * Time Complexity: O(log |n|)
 * Space Complexity: O(log |n|)
 */
export const recursiveSolution = SolutionSchema.implement((x, n) => {
  if (x === 0 && n <= 0) {
    return NaN;
  }
  if (x === 0) {
    return 0;
  }
  function times(x: number, n: number): number {
    if (n === 0) {
      return 1;
    }
    if (n % 2 === 0) {
      const intermediate = times(x, n / 2);
      return intermediate * intermediate;
    }
    return x * times(x, n - 1);
  }
  const initial = n >= 0 ? x : 1 / x;
  return times(initial, Math.abs(n));
});

/**
 * Iterative Solution
 * Approach:
 *   - Use a loop to calculate the power of x to the power of n
 *   - If x is 0 and n is less than or equal to 0, return NaN
 *   - If x is 0, return 0
 *   - If n is 0, return 1
 *   - Otherwise, return x to the power of n
 * Time Complexity: O(log |n|)
 * Space Complexity: O(1)
 */
export const iterativeSolution = SolutionSchema.implement((x, n) => {
  if (x === 0 && n <= 0) {
    return NaN;
  }
  if (x === 0) {
    return 0;
  }
  if (n === 0) {
    return 1;
  }
  let result = 1;
  let power = Math.abs(n);
  let base = n > 0 ? x : 1 / x;
  while (power > 0) {
    if (power % 2 === 1) {
      result *= base;
    }
    base *= base;
    power = Math.floor(power / 2);
  }
  return result;
});

export const solutions = [recursiveSolution, iterativeSolution];
