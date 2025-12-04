/**
 * 0119. Pascal's Triangle II
 *
 * Difficulty: easy
 * Tags: array, dynamic-programming
 *
 * Description:
 * Given an integer `rowIndex`, return the `rowIndex^th` (**0-indexed**) row of the **Pascal's triangle**.
 *
 * In **Pascal's triangle**, each number is the sum of the two numbers directly above it as shown:
 *
 * ![](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)
 *
 * Examples:
 * 1. Input: rowIndex = 3
 *    Output: \[1,3,3,1\]
 *    Image: https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif
 * 2. Input: rowIndex = 0
 *    Output: \[1\]
 * 3. Input: rowIndex = 1
 *    Output: \[1,1\]
 *
 * Constraints:
 * - `0 <= rowIndex <= 33`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.number()],
  output: z.array(z.number()).nullable(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [3],
    expected: [1, 3, 3, 1],
    name: 'Example 1',
  },
  {
    input: [0],
    expected: [1],
    name: 'Example 2',
  },
  {
    input: [1],
    expected: [1, 1],
    name: 'Example 3',
  },
  {
    input: [2],
    expected: [1, 2, 1],
    name: 'Example 4',
  },
];

/**
 * Iterative Solution
 * Approach:
 *   - use the previous row to calculate the current row
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
export const iterativeSolution = SolutionSchema.implement((rowIndex) => {
  const pascalRow = Array(rowIndex + 1).fill(1);
  for (let i = 2; i <= rowIndex; i += 1) {
    for (let j = i - 1; j > 0; j -= 1) {
      pascalRow[j] += pascalRow[j - 1];
    }
  }
  return pascalRow;
});

export const solutions = [iterativeSolution];
