/**
 * 0700. Search in a Binary Search Tree
 *
 * Difficulty: easy
 * Tags: tree, binary-search-tree, binary-tree
 *
 * Description:
 * You are given the `root` of a binary search tree (BST) and an integer `val`.
 *
 * Find the node in the BST that the node's value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.
 *
 * Examples:
 * 1. Input: root = \[4,2,7,1,3\], val = 2
 *    Output: \[2,1,3\]
 *    Image: https://assets.leetcode.com/uploads/2021/01/12/tree1.jpg
 * 2. Input: root = \[4,2,7,1,3\], val = 5
 *    Output: \[\]
 *    Image: https://assets.leetcode.com/uploads/2021/01/12/tree2.jpg
 *
 * Constraints:
 * - The number of nodes in the tree is in the range `[1, 5000]`.
 * - `1 <= Node.val <= 10^7`
 * - `root` is a binary search tree.
 * - `1 <= val <= 10^7`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';
import { arrayToTreeNode, TreeNodeSchema } from '../shared/tree-node.js';

export const SolutionSchema = z.function({
  input: [TreeNodeSchema.nullable(), z.number()],
  output: TreeNodeSchema.nullable(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: () => [arrayToTreeNode([4, 2, 7, 1, 3]), 2],
    expected: arrayToTreeNode([2, 1, 3]),
    name: 'Example 1',
  },
  {
    input: () => [arrayToTreeNode([4, 2, 7, 1, 3]), 5],
    expected: arrayToTreeNode([]),
    name: 'Example 2',
  },
];

/**
 * Solution
 * Approach:
 *   - Add your approach here
 * Time Complexity: O()
 * Space Complexity: O()
 */
export const recursiveSolution = SolutionSchema.implement((root, val) => {
  if (root == null) {
    return null;
  }
  if (val === root.val) {
    return root;
  }
  if (val < root.val) {
    return recursiveSolution(root.left, val);
  }
  return recursiveSolution(root.right, val);
});

export const solutions = [recursiveSolution];
