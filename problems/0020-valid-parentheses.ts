/**
 * 0020. Valid Parentheses
 *
 * Difficulty: easy
 * Tags: string, stack
 *
 * Description:
 * Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
 * 
 * An input string is valid if:
 * 
 * 1.  Open brackets must be closed by the same type of brackets.
 * 2.  Open brackets must be closed in the correct order.
 * 3.  Every close bracket has a corresponding open bracket of the same type.
 *
 * Examples:
 * 1. Input: s = "()"
 *    Output: true
 * 2. Input: s = "()\[\]{}"
 *    Output: true
 * 3. Input: s = "(\]"
 *    Output: false
 * 4. Input: s = "(\[\])"
 *    Output: true
 * 5. Input: s = "(\[)\]"
 *    Output: false
 *
 * Constraints:
 * - `1 <= s.length <= 104`
 * - `s` consists of parentheses only `'()[]{}'`.
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.string()],
  output: z.boolean()
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: ['()'],
    expected: true,
    name: 'Example 1',
  },
  {
    input: ['()[]{}'],
    expected: true,
    name: 'Example 2',
  },
  {
    input: ['(]'],
    expected: false,
    name: 'Example 3',
  },
  {
    input: ['([])'],
    expected: true,
    name: 'Example 4',
  },
  {
    input: ['([)]'],
    expected: false,
    name: 'Example 5',
  },
];

/**
 * Stack Solution
 * Approach:
 *   - Use a stack to store the opening parentheses
 *   - For each closing parenthesis, check if the stack is empty or the top of the stack is the corresponding opening parenthesis
 *   - If it is, pop the stack; otherwise, return false
 *   - If the stack is empty at the end, return true; otherwise, return false
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const solution = SolutionSchema.implement((s) => {
  const matching = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  const stack: ('(' | '[' | '{')[] = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== matching[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
});

export const solutions = [solution];
