/**
 * 0374. Guess Number Higher or Lower
 *
 * Difficulty: easy
 * Tags: binary-search, interactive
 *
 * Description:
 * We are playing the Guess Game. The game is as follows:
 * 
 * I pick a number from `1` to `n`. You have to guess which number I picked (the number I picked stays the same throughout the game).
 * 
 * Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
 * 
 * You call a pre-defined API `int guess(int num)`, which returns three possible results:
 * 
 * -   `-1`: Your guess is higher than the number I picked (i.e. `num > pick`).
 * -   `1`: Your guess is lower than the number I picked (i.e. `num < pick`).
 * -   `0`: your guess is equal to the number I picked (i.e. `num == pick`).
 * 
 * Return _the number that I picked_.
 *
 * Examples:
 * 1. Input: n = 10, pick = 6
 *    Output: 6
 * 2. Input: n = 1, pick = 1
 *    Output: 1
 * 3. Input: n = 2, pick = 1
 *    Output: 1
 *
 * Constraints:
 * - `1 <= n <= 2^31 - 1`
 * - `1 <= pick <= n`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.number(), z.number()],
  output: z.number()
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  { input: [10, 6], expected: 6, name: 'Example 1' },
  { input: [1, 1], expected: 1, name: 'Example 2' },
  { input: [2, 1], expected: 1, name: 'Example 3' },
];



/**
 * Solution
 * Approach: 
 *   - Add your approach here
 * Time Complexity: O()
 * Space Complexity: O()
 */
export const solution = SolutionSchema.implement((n, pick) => {
  const guess = (num: number) => {
    if (num > pick) return -1;
    if (num < pick) return 1;
    return 0;
  };

  const guessNumber = (n: number): number => {
    let left = 0;
    let right = n;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const guessResult = guess(mid)
      switch (guessResult) {
        case (0): {
          return mid;
        }
        case (1): {
          left = mid + 1;
          break;
        }
        case (-1): {
          right = mid - 1;
          break;
        }
      }
    }
    return Math.min(left, right);
  }

  return guessNumber(n);
});

export const solutions = [solution];
