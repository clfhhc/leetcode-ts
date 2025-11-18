/**
 * 0206. Reverse Linked List
 *
 * Difficulty: easy
 * Tags: linked-list, recursion
 *
 * Description:
 * Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.
 *
 * Examples:
 * 1. Input: head = \[1,2,3,4,5\]
 *    Output: \[5,4,3,2,1\]
 *    Image: https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg
 * 2. Input: head = \[1,2\]
 *    Output: \[2,1\]
 *    Image: https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg
 * 3. Input: head = \[\]
 *    Output: \[\]
 *
 * Constraints:
 * - The number of nodes in the list is the range `[0, 5000]`.
 * - `-5000 <= Node.val <= 5000`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';
import {
  arrayToLinkedList,
  ListNode,
  ListNodeSchema,
} from '../shared/list-node.js';

export const SolutionSchema = z.function({
  input: [ListNodeSchema.nullable()],
  output: ListNodeSchema.nullable(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: () => [arrayToLinkedList([1, 2, 3, 4, 5])],
    expected: arrayToLinkedList([5, 4, 3, 2, 1]),
    name: 'Example 1',
  },
  {
    input: () => [arrayToLinkedList([1, 2])],
    expected: arrayToLinkedList([2, 1]),
    name: 'Example 2',
  },
  {
    input: () => [arrayToLinkedList([])],
    expected: arrayToLinkedList([]),
    name: 'Example 3',
  },
];

/**
 * Recursive Solution
 * Approach:
 *   - Recursive approach
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const recursiveSolution = SolutionSchema.implement((head) => {
  if (head?.next == null) {
    return head;
  }
  const helper = (l1: ListNode | null, l2: ListNode | null) => {
    if (l1 == null) {
      return l2;
    }
    if (l2 == null) {
      return helper(l1.next, new ListNode(l1.val));
    }
    const temp2 = l1.next;
    const temp1 = l1;
    temp1.next = l2;
    return helper(temp2, temp1);
  };

  return helper(head, null);
});

/**
 * Iterative Solution
 * Approach:
 *   - Iterative approach
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const iterativeSolution = SolutionSchema.implement((head) => {
  const result: [ListNode | null, ListNode | null] = [head, null];
  while (result[0] != null) {
    const temp = result[0].next;
    result[0].next = result[1];
    result[1] = result[0];
    result[0] = temp;
  }
  return result[1];
});

export const solutions = [recursiveSolution, iterativeSolution];
