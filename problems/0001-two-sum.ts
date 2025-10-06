/**
 * 0001. Two Sum
 *
 * Difficulty: easy
 * Tags: array, hash-table
 *
 * Description:
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 *
 * Approach:
 * - Use a hashmap to store complement -> index
 * - For each number, check if its complement exists in the map
 * - If found, return the indices; otherwise, store current number and index
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
import { z } from 'zod';
import type { ProblemMeta, TestCase } from '../packages/src/types.js';

export const meta: ProblemMeta = {
  id: 1,
  slug: 'two-sum',
  title: 'Two Sum',
  tags: ['array', 'hash-table'],
  difficulty: 'easy',
};

export const inputSchema = z.object({
  nums: z.array(z.number()),
  target: z.number(),
});

export type Input = z.infer<typeof inputSchema>;
export type Output = [number, number];

export function solve({ nums, target }: Input): Output {
  const seen = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;
    
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    
    seen.set(num, i);
  }
  
  throw new Error('No solution found');
}

export const cases: TestCase<Input, Output>[] = [
  {
    input: { nums: [2, 7, 11, 15], target: 9 },
    expected: [0, 1],
    name: 'Example 1'
  },
  {
    input: { nums: [3, 2, 4], target: 6 },
    expected: [1, 2],
    name: 'Example 2'
  },
  {
    input: { nums: [3, 3], target: 6 },
    expected: [0, 1],
    name: 'Example 3'
  },
  {
    input: { nums: [1, 2, 3, 4, 5], target: 8 },
    expected: [2, 4],
    name: 'Custom test 1'
  },
  {
    input: { nums: [-1, -2, -3, -4, -5], target: -8 },
    expected: [2, 4],
    name: 'Negative numbers'
  }
];
