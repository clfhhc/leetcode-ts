/**
 * 0020. Valid Parentheses
 *
 * Difficulty: easy
 * Tags: string, stack
 *
 * Description:
 * <p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
 * <p>An input string is valid if:</p>
 * <ol>
 * <li>Open brackets must be closed by the same type of brackets.</li>
 * <li>Open brackets must be closed in the correct order.</li>
 * <li>Every close bracket has a corresponding open bracket of the same type.</li>
 * </ol>
 * <p> </p>
 * <p><strong class="example">Example 1:</strong></p>
 * <div class="example-block">
 * <p><strong>Input:</strong> <span class="example-io">s = "()"</span></p>
 * <p><strong>Output:</strong> <span class="example-io">true</span></p>
 * </div>
 * <p><strong class="example">Example 2:</strong></p>
 * <div class="example-block">
 * <p><strong>Input:</strong> <span class="example-io">s = "()[]{}"</span></p>
 * <p><strong>Output:</strong> <span class="example-io">true</span></p>
 * </div>
 * <p><strong class="example">Example 3:</strong></p>
 * <div class="example-block">
 * <p><strong>Input:</strong> <span class="example-io">s = "(]"</span></p>
 * <p><strong>Output:</strong> <span class="example-io">false</span></p>
 * </div>
 * <p><strong class="example">Example 4:</strong></p>
 * <div class="example-block">
 * <p><strong>Input:</strong> <span class="example-io">s = "([])"</span></p>
 * <p><strong>Output:</strong> <span class="example-io">true</span></p>
 * </div>
 * <p><strong class="example">Example 5:</strong></p>
 * <div class="example-block">
 * <p><strong>Input:</strong> <span class="example-io">s = "([)]"</span></p>
 * <p><strong>Output:</strong> <span class="example-io">false</span></p>
 * </div>
 * <p> </p>
 * <p><strong>

 *
 * Constraints:
 * - </strong></p>
 * - <ul>
 * - <li><code>1 <= s.length <= 10<sup>4</sup></code></li>
 * - <li><code>s</code> consists of parentheses only <code>'()[]{}'</code>.</li>
 * - </ul>

 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.string()],
  output: z.any()
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
