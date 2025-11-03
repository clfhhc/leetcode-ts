/**
 * 0278. First Bad Version
 *
 * Difficulty: easy
 * Tags: binary-search, interactive
 *
 * Description:
 * You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
 *
 * Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.
 *
 * You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
 *
 * Examples:
 * 1. Input: n = 1, bad = 1
 *    Output: 1
 *
 * Constraints:
 * - `1 <= bad <= n <= 2^31 - 1`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.number(), z.number()],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  { input: [1, 1], expected: 1, name: 'Example 1' },
  { input: [2, 1], expected: 1, name: 'Example 2' },
  { input: [3, 2], expected: 2, name: 'Example 3' },
  { input: [4, 1], expected: 1, name: 'Example 4' },
  { input: [5, 4], expected: 4, name: 'Example 5' },
  { input: [6, 4], expected: 4, name: 'Example 6' },
  { input: [7, 4], expected: 4, name: 'Example 7' },
  { input: [8, 4], expected: 4, name: 'Example 8' },
];

/**
 * Binary Search Solution
 * Approach:
 *   - Use binary search to find the first bad version.
 *   - If the middle version is bad, then the first bad version is in the left half.
 *   - If the middle version is not bad, then the first bad version is in the right half.
 *   - Return the first bad version.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const binarySearchSolution = SolutionSchema.implement((n, bad) => {
  const isBadVersion = (version: number): boolean => version >= bad;

  const firstBadVersion = (num: number) => {
    if (num === 0) {
      return 0;
    }
    let start = 0;
    let end = num;
    while (start < end) {
      const mid = Math.floor(start + (end - start) / 2);
      if (isBadVersion(mid)) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }
    return start;
  };

  return firstBadVersion(n);
});

export const solutions = [binarySearchSolution];
