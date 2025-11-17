/**
 * 0002. Add Two Numbers
 *
 * Difficulty: medium
 * Tags: linked-list, math, recursion
 *
 * Description:
 * You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Examples:
 * 1. Input: l1 = \[0\], l2 = \[0\]
 *    Output: \[0\]
 * 2. Input: l1 = \[9,9,9,9,9,9,9\], l2 = \[9,9,9,9\]
 *    Output: \[8,9,9,9,0,0,0,1\]
 *
 * Constraints:
 * - The number of nodes in each linked list is in the range `[1, 100]`.
 * - `0 <= Node.val <= 9`
 * - It is guaranteed that the list represents a number that does not have leading zeros.
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
  input: [ListNodeSchema.nullable(), ListNodeSchema.nullable()],
  output: ListNodeSchema.nullable(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [arrayToLinkedList([2, 4, 3]), arrayToLinkedList([5, 6, 4])],
    expected: arrayToLinkedList([7, 0, 8]),
    name: 'Example 1',
  },
  {
    input: [arrayToLinkedList([0]), arrayToLinkedList([0])],
    expected: arrayToLinkedList([0]),
    name: 'Example 2',
  },
  {
    input: [
      arrayToLinkedList([9, 9, 9, 9, 9, 9, 9]),
      arrayToLinkedList([9, 9, 9, 9]),
    ],
    expected: arrayToLinkedList([8, 9, 9, 9, 0, 0, 0, 1]),
    name: 'Example 3',
  },
];

/**
 * Iterative Solution
 * @utilities: ListNode
 * Approach:
 *   - Traverse both linked lists simultaneously
 *   - Add corresponding digits plus carry from previous addition
 *   - Create new node for each digit of the result
 *   - Handle different lengths by treating missing digits as 0
 * Time Complexity: O(max(m, n)) where m, n are lengths of the two lists
 * Space Complexity: O(max(m, n)) for the result list
 */
export const iterativeSolution = SolutionSchema.implement((l1, l2) => {
  const dummy = new ListNode();
  let current = dummy;
  let carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    l1 = l1?.next || null;
    l2 = l2?.next || null;
  }
  return dummy.next;
});

export const solutions = [iterativeSolution];
