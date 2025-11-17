/**
 * 0024. Swap Nodes in Pairs
 *
 * Difficulty: medium
 * Tags: linked-list, recursion
 *
 * Description:
 * Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
 *
 * Examples:
 * 1. Input: head = \[1,2,3,4\]
 *    Output: \[2,1,4,3\]
 *    Explanation: ![](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)
 *    Image: https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg
 * 2. Input: head = \[\]
 *    Output: \[\]
 * 3. Input: head = \[1\]
 *    Output: \[1\]
 * 4. Input: head = \[1,2,3\]
 *    Output: \[2,1,3\]
 *
 * Constraints:
 * - The number of nodes in the list is in the range `[0, 100]`.
 * - `0 <= Node.val <= 100`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';
import { arrayToLinkedList, ListNodeSchema } from '../shared/list-node.js';

export const SolutionSchema = z.function({
  input: [ListNodeSchema.nullable()],
  output: ListNodeSchema.nullable(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [arrayToLinkedList([1, 2, 3, 4])],
    expected: arrayToLinkedList([2, 1, 4, 3]),
    name: 'Example 1',
  },
  {
    input: [arrayToLinkedList([])],
    expected: arrayToLinkedList([]),
    name: 'Example 2',
  },
  {
    input: [arrayToLinkedList([1])],
    expected: arrayToLinkedList([1]),
    name: 'Example 3',
  },
  {
    input: [arrayToLinkedList([1, 2, 3])],
    expected: arrayToLinkedList([2, 1, 3]),
    name: 'Example 4',
  },
];

/**
 * Solution
 * @utilities: ListNode
 * Approach:
 *   - Add your approach here
 * Time Complexity: O()
 * Space Complexity: O()
 */
export const recursiveSolution = SolutionSchema.implement((head) => {
  if (head == null || head.next == null) {
    return head;
  }
  const temp = head.next;
  head.next = recursiveSolution(temp.next);
  temp.next = head;
  return temp;
});

export const solutions = [recursiveSolution];
