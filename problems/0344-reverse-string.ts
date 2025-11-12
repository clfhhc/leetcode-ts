/**
 * 0344. Reverse String
 *
 * Difficulty: easy
 * Tags: two-pointers, string
 *
 * Description:
 * Write a function that reverses a string. The input string is given as an array of characters `s`.
 *
 * You must do this by modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm) with `O(1)` extra memory.
 *
 * Examples:
 * 1. Input: s = \["h","e","l","l","o"\]
 *    Output: \["o","l","l","e","h"\]
 * 2. Input: s = \["H","a","n","n","a","h"\]
 *    Output: \["h","a","n","n","a","H"\]
 *
 * Constraints:
 * - `1 <= s.length <= 10^5`
 * - `s[i]` is a [printable ascii character](https://en.wikipedia.org/wiki/ASCII#Printable_characters).
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.array(z.string().length(1))],
  output: z.array(z.string().length(1)),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [['h', 'e', 'l', 'l', 'o']],
    expected: ['o', 'l', 'l', 'e', 'h'],
    name: 'Example 1',
  },
  {
    input: [['H', 'a', 'n', 'n', 'a', 'h']],
    expected: ['h', 'a', 'n', 'n', 'a', 'H'],
    name: 'Example 2',
  },
];

/**
 * Recursive Solution
 * Approach:
 *   - Use a recursive function to reverse the array
 *   - Return the reversed array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const recursiveSolution = SolutionSchema.implement((s) => {
  if (s.length <= 1) {
    return s;
  }
  const helper = (left: number, right: number) => {
    if (left >= right) {
      return;
    }
    [s[left], s[right]] = [s[right], s[left]];
    helper(left + 1, right - 1);
  };
  helper(0, s.length - 1);
  return s;
});

/**
 * Iterative Solution
 * Approach:
 *   - Use a while loop to reverse the array
 *   - Return the reversed array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const iterativeSolution = SolutionSchema.implement((s) => {
  if (s.length <= 1) {
    return s;
  }
  let left = 0;
  let right = s.length - 1;
  let temp: string;
  while (left < right) {
    temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
});

export const solutions = [recursiveSolution, iterativeSolution];
