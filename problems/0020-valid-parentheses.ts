/**
 * 0020. Valid Parentheses
 *
 * Difficulty: easy
 * Tags: string, stack
 *
 * Description:
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
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
  // Add your test cases here
  // { input: [/* your input values */], expected: /* expected output */, name: 'Example 1' },
];

/**
 * Solution
 * Approach: 
 *   - Add your approach here
 * Time Complexity: O()
 * Space Complexity: O()
 */
export const solution = SolutionSchema.implement((s) => {
  // Your solution here
  throw new Error('Not implemented');
});

export const solutions = [solution];
