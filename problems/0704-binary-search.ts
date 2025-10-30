/**
 * 0704. Binary Search
 *
 * Difficulty: easy
 * Tags: array, binary-search
 *
 * Description:
 * Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.
 * 
 * You must write an algorithm with `O(log n)` runtime complexity.
 *
 * Examples:
 * 1. Input: nums = \[-1,0,3,5,9,12\], target = 9
 *    Output: 4
 *    Explanation: 9 exists in nums and its index is 4
 * 2. Input: nums = \[-1,0,3,5,9,12\], target = 2
 *    Output: -1
 *    Explanation: 2 does not exist in nums so return -1
 *
 * Constraints:
 * - `1 <= nums.length <= 104`
 * - `-104 < nums[i], target < 104`
 * - All the integers in `nums` are **unique**.
 * - `nums` is sorted in ascending order.
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.number()
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [[-1, 0, 3, 5, 9, 12], 9],
    expected: 4,
    name: 'Example 1',
  },
  {
    input: [[-1, 0, 3, 5, 9, 12], 2],
    expected: -1,
    name: 'Example 2',
  },
  {
    input: [[-1, 0, 3, 5, 9, 12], 13],
    expected: -1,
    name: 'Example 3',
  },
  {
    input: [[-1, 0, 3, 5, 9, 12], -1],
    expected: 0,
    name: 'Added negative number case',
  },
  {
    input: [[-1, 0, 3, 5, 9, 12], 12],
    expected: 5,
    name: 'Added positive number case',
  }
];

/**
 * Solution
 * Approach:
 *   - Use a while loop to search for the target in the array.
 *   - Use a variable `mid` to store the middle index of the array.
 *   - Use a variable `length` to store the length of the array.
 *   - Use a variable `target` to store the target value.
 *   - Use a variable `nums` to store the array.
 *   - Return the index of the target in the array.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const solution = SolutionSchema.implement((nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
});

export const solutions = [solution];
