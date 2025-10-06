/**
 * 0002. Add Two Numbers
 *
 * Difficulty: medium
 * Tags: linked-list, math, recursion
 *
 * Description:
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Approach:
 * - Traverse both linked lists simultaneously
 * - Add corresponding digits plus carry from previous addition
 * - Create new node for each digit of the result
 * - Handle different lengths by treating missing digits as 0
 *
 * Time Complexity: O(max(m, n)) where m, n are lengths of the two lists
 * Space Complexity: O(max(m, n)) for the result list
 */
import { z } from 'zod';
import type { ProblemMeta, TestCase } from '@types';

export const meta: ProblemMeta = {
  id: 2,
  slug: 'add-two-numbers',
  title: 'Add Two Numbers',
  tags: ['linked-list', 'math', 'recursion'],
  difficulty: 'medium',
};

// Helper type for linked list node
export interface ListNode {
  val: number;
  next: ListNode | null;
}

export const inputSchema = z.object({
  l1: z.object({
    val: z.number(),
    next: z.lazy(() => z.union([inputSchema.shape.l1, z.null()]))
  }).nullable(),
  l2: z.object({
    val: z.number(),
    next: z.lazy(() => z.union([inputSchema.shape.l2, z.null()]))
  }).nullable(),
});

export type Input = z.infer<typeof inputSchema>;
export type Output = ListNode | null;

export function solve({ l1, l2 }: Input): Output {
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

// Helper function to create linked list from array
function createList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  
  const head = { val: arr[0], next: null } as ListNode;
  let current = head;
  
  for (let i = 1; i < arr.length; i++) {
    current.next = { val: arr[i], next: null };
    current = current.next;
  }
  
  return head;
}

// Helper function to convert linked list to array
function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  
  return result;
}

export const cases: TestCase<Input, Output>[] = [
  {
    input: {
      l1: createList([2, 4, 3]),
      l2: createList([5, 6, 4])
    },
    expected: createList([7, 0, 8]),
    name: 'Example 1'
  },
  {
    input: {
      l1: createList([0]),
      l2: createList([0])
    },
    expected: createList([0]),
    name: 'Example 2'
  },
  {
    input: {
      l1: createList([9, 9, 9, 9, 9, 9, 9]),
      l2: createList([9, 9, 9, 9])
    },
    expected: createList([8, 9, 9, 9, 0, 0, 0, 1]),
    name: 'Example 3'
  }
];
