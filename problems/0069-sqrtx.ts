/**
 * 0069. Sqrt(x)
 *
 * Difficulty: easy
 * Tags: math, binary-search
 *
 * Description:
 * Given a non-negative integer `x`, return _the square root of_ `x` _rounded down to the nearest integer_. The returned integer should be **non-negative** as well.
 * 
 * You **must not use** any built-in exponent function or operator.
 * 
 * -   For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.
 *
 * Examples:
 * 1. Input: x = 4
 *    Output: 2
 *    Explanation: The square root of 4 is 2, so we return 2.
 * 2. Input: x = 8
 *    Output: 2
 *    Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
 *
 * Constraints:
 * - `0 <= x <= 2^31 - 1`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.number()],
  output: z.nullable(z.number())
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [4],
    expected: 2,
    name: 'Example 1',
  },
  {
    input: [8],
    expected: 2,
    name: 'Example 2'
  },
  {
    input: [16],
    expected: 4,
    name: 'Extended Example 1',
  },
  {
    input: [25],
    expected: 5,
    name: 'Extended Example 2',
  },
  {
    input: [0],
    expected: 0,
    name: 'Extended Example 3',
  },
  {
    input: [11],
    expected: 3,
    name: 'Extended Example 4',
  },
  {
    input: [3],
    expected: 1,
    name: 'Extended Example 5',
  },
  {
    input: [1],
    expected: 1,
    name: 'Extended Example 6',
  },
];

/**
 * Binary Search Solution
 * Approach: 
 *   - Use binary search to find the square root of the number.
 *   - If the square of the middle number is equal to the number, then return the middle number.
 *   - If the square of the middle number is greater than the number, then the square root is less than the middle number, so we need to search in the left half.
 *   - If the square of the middle number is less than the number, then the square root is greater than the middle number, so we need to search in the right half.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const binarySearchSolution = SolutionSchema.implement((x) => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  let start = 0;
  let end = x;
  while (start <= end) {
    const mid = Math.floor((end + start) / 2);
    const mid_square = mid * mid;
    if (mid_square === x) {
      return mid;
    }
    if (mid_square > x) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return Math.min(start, end);
});

/**
 * Newton's Method Solution
 * Approach: 
 *   - Use Newton's method to find the square root of the number.
 *   - If the square of the guess is greater than the number, then the guess is too high, so we need to decrease the guess.
 *   - If the square of the guess is less than the number, then the guess is too low, so we need to increase the guess.
 *   - If the square of the guess is equal to the number, then return the guess.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const newtonMethodSolution = SolutionSchema.implement((x) => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  let guess = x;
  while (guess * guess > x && guess) {
    guess = (guess + x / guess) / 2;
  }
  return Math.floor(guess);
});

export const solutions = [binarySearchSolution, newtonMethodSolution];
