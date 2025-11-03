/**
 * 0004. Median of Two Sorted Arrays
 *
 * Difficulty: hard
 * Tags: array, binary-search, divide-and-conquer
 *
 * Description:
 * Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.
 * 
 * The overall run time complexity should be `O(log (m+n))`.
 *
 * Examples:
 * 1. Input: nums1 = \[1,3\], nums2 = \[2\]
 *    Output: 2.00000
 *    Explanation: merged array = \[1,2,3\] and median is 2.
 * 2. Input: nums1 = \[1,2\], nums2 = \[3,4\]
 *    Output: 2.50000
 *    Explanation: merged array = \[1,2,3,4\] and median is (2 + 3) / 2 = 2.5.
 *
 * Constraints:
 * - `nums1.length == m`
 * - `nums2.length == n`
 * - `0 <= m <= 1000`
 * - `0 <= n <= 1000`
 * - `1 <= m + n <= 2000`
 * - `-10^6 <= nums1[i], nums2[i] <= 10^6`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.array(z.number()), z.array(z.number())],
  output: z.nullable(z.number())
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  { input: [[1, 3], [2]], expected: 2.00000, name: 'Example 1' },
  { input: [[1, 2], [3, 4]], expected: 2.50000, name: 'Example 2' },
  { input: [[0, 0], [0, 0]], expected: 0.00000, name: 'Extended Example 1' },
  { input: [[], [1]], expected: 1.00000, name: 'Extended Example 2' },
  { input: [[2], []], expected: 2.00000, name: 'Extended Example 3' },
  { input: [[1, 2], [3, 4, 5, 6, 7, 8, 9, 10]], expected: 5.50000, name: 'Extended Example 4' },
  { input: [[], [1, 2, 3, 4, 5]], expected: 3.00000, name: 'Extended Example 5' },
];

/**
 * Binary Search Solution
 * Approach: 
 *   - Use binary search to find the median.
 *   - If the total length is even, return the average of the two middle elements.
 *   - If the total length is odd, return the middle element.
 *   - If the left partition of nums1 is too large, we need to move the partition to the left.
 *   - If the left partition of nums1 is too small, we need to move the partition to the right.
 * Time Complexity: O(log (min(m, n)))
 * Space Complexity: O(1)
 */
export const binarySearchSolution = SolutionSchema.implement((nums1, nums2) => {
  const [short, long] = nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1];
  const totalLength = short.length + long.length;
  // Binary search on the shorter array
  let low = 0, high = short.length;
  while (low <= high) {
    const mid1 = Math.floor((low + high) / 2)
    const mid2 = Math.floor((totalLength + 1) / 2) - mid1;

    // Find elements to the left and right of partition in short and long
    const maxLeft1 = mid1 === 0 ? -Infinity : short[mid1 - 1];
    const minRight1 = mid1 === short.length ? Infinity : short[mid1];
    const maxLeft2 = mid2 === 0 ? -Infinity : long[mid2 - 1];
    const minRight2 = mid2 === long.length ? Infinity : long[mid2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // If we have found the correct partition, return the median
      if (totalLength % 2 === 0) {
        // If the total length is even, return the average of the two middle elements
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      } else {
        // If the total length is odd, return the middle element
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      // If the left partition of nums1 is too large, we need to move the partition to the left
      high = mid1 - 1;
    } else {
      low = mid1 + 1;
    }
  }
  return null;
});

/**
 * Merge of Merge Sort Solution
 * Approach: 
 *   - The idea is to simulate the merging process of two sorted arrays without actually creating a new one
 *   - We use two pointers to traverse the two arrays and merge them into a new array
 *   - We use a variable `i` to traverse the first array and a variable `j` to traverse the second array
 *   - We use a variable `k` to traverse the merged array
 *   - We use a variable `merged` to store the merged array
 *   - We return the median of the merged array
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
export const mergeOfMergeSortSolution = SolutionSchema.implement((nums1, nums2) => {
  let i = 0, j = 0, k = 0;
  const merged: number[] = [];
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged[k] = nums1[i++];
      k++;
    } else {
      merged[k] = nums2[j++];
      k++;
    }
  }
  while (i < nums1.length) {
    merged[k++] = nums1[i++];
  }
  while (j < nums2.length) {
    merged[k++] = nums2[j++];
  }
  const mid = Math.floor(merged.length / 2);
  if (merged.length % 2 === 0) {
    return (merged[mid - 1] + merged[mid]) / 2;
  } else {
    return merged[mid];
  }
});

export const solutions = [binarySearchSolution, mergeOfMergeSortSolution];
