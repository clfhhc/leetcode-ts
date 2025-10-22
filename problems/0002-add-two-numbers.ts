/**
 * 0002. Add Two Numbers
 *
 * Difficulty: medium
 * Tags: linked-list, math, recursion
 *
 * Description:
 * You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
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

export const ListNodeSchema: z.ZodType<{ val: number; next: any }> = z.lazy(
  () =>
    z.object({
      val: z.number(),
      next: z.union([ListNodeSchema, z.null()]),
    })
);

export type ListNode = z.infer<typeof ListNodeSchema>;

export const SolutionSchema = z.function({
  input: [ListNodeSchema, ListNodeSchema],
  output: ListNodeSchema,
});

export type Solution = z.infer<typeof SolutionSchema>;

export const arrayToLinkedList = (arr: number[]): ListNode => {
  if (arr.length === 0) throw new Error('Array is empty');
  const head = { val: arr[0], next: null } as ListNode;
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = { val: arr[i], next: null } as ListNode;
    current = current.next;
  }
  return head;
};

export const linkedListToArray = (head: ListNode): number[] => {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
};

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
 * @utilities: ListNodeSchema, ListNode
 * Approach:
 *   - Traverse both linked lists simultaneously
 *   - Add corresponding digits plus carry from previous addition
 *   - Create new node for each digit of the result
 *   - Handle different lengths by treating missing digits as 0
 * Time Complexity: O(max(m, n)) where m, n are lengths of the two lists
 * Space Complexity: O(max(m, n)) for the result list
 */
export const iterativeSolution = SolutionSchema.implement(
  (l1, l2) => {
    const dummy = { val: 0, next: null } as ListNode;
    let current = dummy;
    let carry = 0;
    while (l1 || l2 || carry) {
      const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
      carry = Math.floor(sum / 10);
      current.next = { val: sum % 10, next: null };
      current = current.next;
      l1 = l1?.next || null;
      l2 = l2?.next || null;
    }
    return dummy.next;
  }
);

export const solutions = [iterativeSolution];
