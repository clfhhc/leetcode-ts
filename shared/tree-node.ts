import { z } from 'zod';

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

export const arrayToTreeNode = (array: (number | null)[]): TreeNode | null => {
  if (array.length === 0) {
    return null;
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
