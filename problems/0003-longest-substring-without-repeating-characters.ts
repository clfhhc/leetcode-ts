/**
 * 0003. Longest Substring Without Repeating Characters
 *
 * Difficulty: medium
 * Tags: hash-table, string, sliding-window
 *
 * Description:
 * Given a string `s`, find the length of the **longest** **substring** without duplicate characters.
 *
 * Examples:
 * 1. Input: s = "abcabcbb"
 *    Output: 3
 *    Explanation: The answer is "abc", with the length of 3. Note that `"bca"` and `"cab"` are also correct answers.
 * 2. Input: s = "bbbbb"
 *    Output: 1
 *    Explanation: The answer is "b", with the length of 1.
 *
 * Constraints:
 * - `0 <= s.length <= 5 * 10^4`
 * - `s` consists of English letters, digits, symbols and spaces.
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.string()],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  { input: ['abcabcbb'], expected: 3, name: 'Example 1' },
  { input: ['bbbbb'], expected: 1, name: 'Example 2' },
  { input: ['pwwkew'], expected: 3, name: 'Example 3' },
  { input: [' '], expected: 1, name: 'Example 4' },
  { input: ['au'], expected: 2, name: 'Example 5' },
  { input: ['aab'], expected: 2, name: 'Example 6' },
  { input: ['dvdf'], expected: 3, name: 'Example 7' },
  { input: ['abac'], expected: 3, name: 'Example 8' },
  { input: ['abacabc'], expected: 3, name: 'Example 9' },
  { input: ['abacabcde'], expected: 5, name: 'Example 10' },
];

/**
 * Solution
 * Approach:
 *   - Use a sliding window to find the longest substring without repeating characters
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const solution = SolutionSchema.implement((s) => {
  let left = 0;
  let right = 0;
  let maxLength = 0;
  const charSet = new Set();

  while (right < s.length) {
    if (!charSet.has(s[right])) {
      charSet.add(s[right]);
      right++;
      maxLength = Math.max(maxLength, right - left);
    } else {
      charSet.delete(s[left]);
      left++;
    }
  }

  return maxLength;
});

export const solutions = [solution];
