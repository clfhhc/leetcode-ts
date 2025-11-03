/**
 * 0034. Find First and Last Position of Element in Sorted Array
 *
 * Difficulty: medium
 * Tags: array, binary-search
 *
 * Description:
 * Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.
 *
 * If `target` is not found in the array, return `[-1, -1]`.
 *
 * You must write an algorithm with `O(log n)` runtime complexity.
 *
 * Examples:
 * 1. Input: nums = \[5,7,7,8,8,10\], target = 8
 *    Output: \[3,4\]
 * 2. Input: nums = \[5,7,7,8,8,10\], target = 6
 *    Output: \[-1,-1\]
 * 3. Input: nums = \[\], target = 0
 *    Output: \[-1,-1\]
 *
 * Constraints:
 * - `0 <= nums.length <= 10^5`
 * - `-10^9 <= nums[i] <= 10^9`
 * - `nums` is a non-decreasing array.
 * - `-10^9 <= target <= 10^9`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.any(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  { input: [[5, 7, 7, 8, 8, 10], 8], expected: [3, 4], name: 'Example 1' },
  { input: [[5, 7, 7, 8, 8, 10], 6], expected: [-1, -1], name: 'Example 2' },
  { input: [[], 0], expected: [-1, -1], name: 'Example 3' },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1],
    expected: [0, 0],
    name: 'Extended example 1',
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10],
    expected: [9, 9],
    name: 'Extended example 2',
  },
  { input: [[2, 2], 2], expected: [0, 1], name: 'Extended example 3' },
];

/**
 * Binary Search Solution
 * Approach:
 *   - Use binary search to find the first and last position of the target.
 *   - If the target is found, return the indices.
 *   - If the target is not found, return [-1, -1].
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const binarySearchSolution = SolutionSchema.implement((nums, target) => {
  const result = [-1, -1];
  let left = 0;
  let right = nums.length - 1;
  while (left + 1 < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < target) {
      left = mid;
    } else if (nums[mid] >= target) {
      right = mid;
    }
  }
  if (nums[left] === target) {
    result[0] = left;
  } else if (nums[right] === target) {
    result[0] = right;
    left = right;
  }
  right = nums.length - 1;
  while (left + 1 < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] > target) {
      right = mid;
    } else if (nums[mid] === target) {
      left = mid;
    }
  }
  if (nums[right] === target) {
    result[1] = right;
  } else if (nums[left] === target) {
    result[1] = left;
  }
  return result;
});

export const solutions = [binarySearchSolution];
