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
 * 1. Input: root = \[1,null,2\]
 *    Output: 2
 *
 * Constraints:
 * - The number of nodes in the tree is in the range `[0, 10^4]`.
 * - `-100 <= Node.val <= 100`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

// export const TreeNodeSchema: z.ZodType<TreeNode> = z.lazy(() =>
//   z.object({
//     val: z.number(),
//     left: z.lazy(() => TreeNodeSchema).nullable(),
//     right: z.lazy(() => TreeNodeSchema).nullable(),
//   })
// );

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export const TreeNodeSchema = z
  .instanceof(TreeNode)
  .check(
    z.property('val', z.number()),
    z.property('left', z.lazy(() => TreeNodeSchema).nullable()),
    z.property('right', z.lazy(() => TreeNodeSchema).nullable())
  );

export const SolutionSchema = z.function({
  input: [TreeNodeSchema.nullable()],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

const arrayToTreeNode = (array: (number | null)[]): TreeNode => {
  if (array.length === 0) {
    throw new Error('Array is empty');
  }
  const root = new TreeNode(array[0]!);
  const queue: (TreeNode | null)[] = [root];

  for (let index = 1; index < array.length + 1; index += 2) {
    const node = queue.shift();
    if (node) {
      node.left = array[index] ? new TreeNode(array[index]!) : null;
      queue.push(node.left);
      if (index + 1 < array.length) {
        node.right = array[index + 1] ? new TreeNode(array[index + 1]!) : null;
        queue.push(node.right);
      }
    }
  }
  return root;
};

export const cases: TestCase<Solution>[] = [
  {
    input: [arrayToTreeNode([3, 9, 20, null, null, 15, 7])],
    expected: 3,
    name: 'Example 1',
  },
  {
    input: [arrayToTreeNode([1, null, 2])],
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
