/**
 * 0020. Valid Parentheses
 *
 * Difficulty: easy
 * Tags: string, stack
 *
 * Description:
 *  * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * 
 * An input string is valid if:
 * 
 * 
 * 	Open brackets must be closed by the same type of brackets.
 * 	Open brackets must be closed in the correct order.
 * 	Every close bracket has a corresponding open bracket of the same type.
 * 
 * 
 *  
 * Example 1:
 * 
 * 
 * Input: s = "()"
 * 
 * Output: true
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: s = "()[]{}"
 * 
 * Output: true
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: s = "(]"
 * 
 * Output: false
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: s = "([])"
 * 
 * Output: true
 * 
 * 
 * Example 5:
 * 
 * 
 * Input: s = "([)]"
 * 
 * Output: false
 *
 * Constraints:
 * - 1 <= s.length <= 104
 * - s consists of parentheses only '()[]{}'.

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
    input: "()",
    expected: true,
    name: 'Example 1'
  },
  {
    input: "()[]{}",
    expected: true,
    name: 'Example 2'
  },
  {
    input: "(]",
    expected: false,
    name: 'Example 3'
  },
  {
    input: "([])",
    expected: true,
    name: 'Example 4'
  },
  {
    input: "([)]",
    expected: false,
    name: 'Example 5'
  }
];

/**
 * Stack Solution
 * Approach: 
 *   - Use a stack to keep track of opening brackets
 *   - For each character, if it's an opening bracket, push to stack
 *   - If it's a closing bracket, check if it matches the top of stack
 *   - If stack is empty at the end, all brackets are matched
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const stackSolution = SolutionSchema.implement((s) => {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (char in pairs) {
      // Closing bracket
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      // Opening bracket
      stack.push(char);
    }
  }
  
  return stack.length === 0;
});

export const solutions = [stackSolution];
