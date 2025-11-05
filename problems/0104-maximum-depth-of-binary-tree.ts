/**
 * 0104. Maximum Depth of Binary Tree
 *
 * Difficulty: easy
 * Tags: tree, depth-first-search, breadth-first-search, binary-tree
 *
 * Description:
 * Given the `root` of a binary tree, return _its maximum depth_.
 * 
 * A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.
 *
 * Examples:
 * 1. Input: root = \[3,9,20,null,null,15,7\]
 *    Output: 3
 *    Image: https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg
 * 2. Input: root = \[1,null,2\]
 *    Output: 2
 *
 * Constraints:
 * - The number of nodes in the tree is in the range `[0, 10^4]`.
 * - `-100 <= Node.val <= 100`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.any()],
  output: z.number()
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  // Add your test cases here
  // { input: [/* your input values */], expected: /* expected output */, name: 'Example 1' },
];

/**
 * Solution
 * Approach: 
 *   - Add your approach here
 * Time Complexity: O()
 * Space Complexity: O()
 */
export const solution = SolutionSchema.implement((root) => {
  // Your solution here
  throw new Error('Not implemented');
});

export const solutions = [solution];
