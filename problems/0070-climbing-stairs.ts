/**
 * 0070. Climbing Stairs
 *
 * Difficulty: easy
 * Tags: math, dynamic-programming, memoization
 *
 * Description:
 * You are climbing a staircase. It takes `n` steps to reach the top.
 *
 * Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?
 *
 * Examples:
 * 1. Input: n = 2
 *    Output: 2
 *    Explanation: There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps
 * 2. Input: n = 3
 *    Output: 3
 *    Explanation: There are three ways to climb to the top. 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step
 *
 * Constraints:
 * - `1 <= n <= 45`
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
  { input: [2], expected: 2, name: 'Example 1' },
  { input: [3], expected: 3, name: 'Example 2' },
  { input: [4], expected: 5, name: 'Example 3' },
  { input: [5], expected: 8, name: 'Example 4' },
  { input: [6], expected: 13, name: 'Example 5' },
  { input: [7], expected: 21, name: 'Example 6' },
  { input: [8], expected: 34, name: 'Example 7' },
  { input: [9], expected: 55, name: 'Example 8' },
];

/**
 * Solution
 * Approach:
 *   - This is like fibonacci number
 *   - I.e. if there are 5 steps, the last step can be reached by either taking 1 step from the 4th step or 2 steps from the 3rd step
 *   - So, the number of ways to reach the last step is the sum of the number of ways to reach the 4th step and the number of ways to reach the 3rd step
 *   - F(5) = F(4) + F(3)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const memoizationIterativeSolution = SolutionSchema.implement((n) => {
  const result = new Array(n);
  result[0] = 0;
  result[1] = 1;
  for (let i = 2; i <= n + 1; i += 1) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result[n + 1];
});

export const solutions = [memoizationIterativeSolution];
