/**
 * 0001. Two Sum
 *
 * Difficulty: easy
 * Tags: array, hash-table
 *
 * Description:
 * Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.
 * You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice.
 * You can return the answer in any order.
 *
 * Examples:
 * 1. Input: nums = \[2,7,11,15\], target = 9
 *    Output: \[0,1\]
 *    Explanation: Because nums\[0\] + nums\[1\] == 9, we return \[0, 1\].
 * 2. Input: nums = \[3,2,4\], target = 6
 *    Output: \[1,2\]
 * 3. Input: nums = \[3,3\], target = 6
 *    Output: \[0,1\]
 *
 * Constraints:
 * - `2 <= nums.length <= 104`
 * - `-109 <= nums[i] <= 109`
 * - `-109 <= target <= 109`
 * - Only one valid answer exists.
 *
 * Follow-up:
 * - Can you come up with an algorithm that is less than `O(n2)` time complexity?
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.any()
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [[2, 7, 11, 15], 9],
    expected: [0, 1],
    name: 'Example 1',
  },
  {
    input: [[3, 2, 4], 6],
    expected: [1, 2],
    name: 'Example 2',
  },
  {
    input: [[3, 3], 6],
    expected: [0, 1],
    name: 'Example 3',
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19],
    expected: [8, 9],
    name: 'Large array case',
  },
  {
    input: [[-1, -2, -3, -4, -5, -6, -7, -8, -9, -10], -19],
    expected: [8, 9],
    name: 'Negative numbers case',
  },
  {
    input: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0],
    expected: [0, 1],
    name: 'Zero case',
  }
];

/**
 * Hash Map Solution
 * Approach:
 *   - Use a hash map to store number -> index mappings
 *   - For each number, check if its complement (target - number) exists in the map
 *   - If found, return the indices; otherwise, store current number and index
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const hashMapSolution = SolutionSchema.implement((nums, target) => {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(num, i);
  }

  return [];
});

/**
 * Two Pointers Solution
 * Approach:
 *   - Sort the array
 *   - Use two pointers to find the two numbers
 *   - If the sum of the two numbers is equal to the target, return the indices; otherwise, move the pointers
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
export const twoPointersSolution = SolutionSchema.implement((nums, target) => {
  const sortedNums = nums.slice().sort((a, b) => a - b);
  let left = 0;
  let right = sortedNums.length - 1;
  while (left < right) {
    const sum = sortedNums[left] + sortedNums[right];
    if (sum === target) {
      if (sortedNums[left] === sortedNums[right]) {
        const index = nums.indexOf(sortedNums[left]);
        return [
          nums.indexOf(sortedNums[left]),
          nums.indexOf(sortedNums[right], index + 1),
        ];
      }
      const index1 = nums.indexOf(sortedNums[left]);
      const index2 = nums.indexOf(sortedNums[right]);
      return index1 < index2 ? [index1, index2] : [index2, index1];
    }
    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
});

export const solutions = [hashMapSolution, twoPointersSolution];
