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
import {
  arrayToTreeNode,
  TreeNode,
  TreeNodeSchema,
} from '../shared/tree-node.js';

export const SolutionSchema = z.function({
  input: [TreeNodeSchema.nullable()],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: () => [arrayToTreeNode([3, 9, 20, null, null, 15, 7])],
    expected: 3,
    name: 'Example 1',
  },
  {
    input: () => [arrayToTreeNode([1, null, 2])],
    expected: 2,
    name: 'Example 2',
  },
];

/**
 * Iterative Solution
 * @utilities: TreeNode
 * Approach:
 *   - Use a stack to traverse the tree iteratively
 *   - Track the current level and the maximum level
 *   - Return the maximum level
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
export const iterativeSolution = SolutionSchema.implement((root) => {
  if (!root) {
    return 0;
  }
  const stack: [TreeNode, number][] = [[root, 1]];
  let node: TreeNode | null = root;
  let maxLevel = 0;
  let currentLevel = 1;
  while (stack.length > 0 || node !== null) {
    while (node !== null) {
      stack.push([node, currentLevel]);
      node = node.left;
      currentLevel += 1;
    }

    const [currentNode, level] = stack.pop() as [TreeNode, number];
    maxLevel = Math.max(maxLevel, level);

    node = currentNode.right;
    currentLevel = level + 1;
  }

  return maxLevel;
});

/**
 * Recursive Solution
 * @utilities: TreeNode
 * Approach:
 *   - Use a recursive function to traverse the tree
 *   - Return the maximum depth of the left and right subtrees
 *   - Return the maximum depth of the tree
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is the height of the tree
 */
export const recursiveSolution = SolutionSchema.implement((root) => {
  if (!root) {
    return 0;
  }
  return (
    1 + Math.max(recursiveSolution(root.left), recursiveSolution(root.right))
  );
});

export const solutions = [iterativeSolution, recursiveSolution];
