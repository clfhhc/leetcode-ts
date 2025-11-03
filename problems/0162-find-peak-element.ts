/**
 * 0162. Find Peak Element
 *
 * Difficulty: medium
 * Tags: array, binary-search
 *
 * Description:
 * A peak element is an element that is strictly greater than its neighbors.
 *
 * Given a **0-indexed** integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.
 *
 * You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
 *
 * You must write an algorithm that runs in `O(log n)` time.
 *
 * Examples:
 * 1. Input: nums = \[1,2,3,1\]
 *    Output: 2
 *    Explanation: 3 is a peak element and your function should return the index number 2.
 * 2. Input: nums = \[1,2,1,3,5,6,4\]
 *    Output: 5
 *    Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
 *
 * Constraints:
 * - `1 <= nums.length <= 1000`
 * - `-2^31 <= nums[i] <= 2^31 - 1`
 * - `nums[i] != nums[i + 1]` for all valid `i`.
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.array(z.number())],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  { input: [[1, 2, 3, 1]], expected: 2, name: 'Example 1' },
  { input: [[1, 2, 1, 3, 5, 6, 4]], expected: 5, name: 'Example 2' },
  { input: [[1, 2]], expected: 1, name: 'Extended example 1' },
];

/**
 * Binary Search Solution
 * Approach:
 *   - Use binary search to find the peak element.
 *   - If the middle element is greater than the next element, then the peak element is in the left half.
 *   - If the middle element is less than the next element, then the peak element is in the right half.
 *   - Return the index of the peak element.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const binarySearchSolution = SolutionSchema.implement((nums) => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (
      nums[mid] > nums[mid + 1] &&
      (mid === nums.length - 1 || nums[mid] > nums[mid - 1])
    ) {
      return mid;
    }
    if (nums[mid] <= nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
});

export const solutions = [binarySearchSolution];
