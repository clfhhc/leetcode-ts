import { z } from 'zod';

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

export const ListNodeSchema = z
  .instanceof(ListNode)
  .check(
    z.property('val', z.number()),
    z.property('next', z.lazy(() => ListNodeSchema).nullable())
  );

export const arrayToLinkedList = (arr: number[]): ListNode | null => {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
};

export const linkedListToArray = (head: ListNode | null): number[] => {
  const result: number[] = [];
  let current: ListNode | null = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
};
