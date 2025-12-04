/**
 * 0509. Fibonacci Number
 *
 * Difficulty: easy
 * Tags: math, dynamic-programming, recursion, memoization
 *
 * Description:
 * The **Fibonacci numbers**, commonly denoted `F(n)` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from `0` and `1`. That is,
 *
 * F(0) = 0, F(1) = 1
 * F(n) = F(n - 1) + F(n - 2), for n > 1.
 *
 * Given `n`, calculate `F(n)`.
 *
 * Examples:
 * 1. Input: n = 2
 *    Output: 1
 *    Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
 * 2. Input: n = 3
 *    Output: 2
 *    Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
 * 3. Input: n = 4
 *    Output: 3
 *    Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
 *
 * Constraints:
 * - `0 <= n <= 30`
 *
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [z.number()],
  output: z.number(),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
  {
    input: [2],
    expected: 1,
    name: 'Example 1',
  },
  {
    input: [3],
    expected: 2,
    name: 'Example 2',
  },
  {
    input: [4],
    expected: 3,
    name: 'Example 3',
  },
  {
    input: [5],
    expected: 5,
    name: 'Example 4',
  },
];

/**
 * Memoization Recursive Solution
 * Approach:
 *   - Use a cache to store the Fibonacci numbers
 *   - Use a recursive function to calculate the Fibonacci number
 *   - If the Fibonacci number is already in the cache, return it
 *   - Otherwise, calculate the Fibonacci number and store it in the cache
 *   - Return the Fibonacci number
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const memoizationRecursiveSolution = SolutionSchema.implement((n) => {
  const cache: Record<number, number> = {
    0: 0,
    1: 1,
    2: 1,
  };
  function fibonacci(n: number): number {
    if (cache[n] != null) {
      return cache[n];
    }
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return cache[n];
  }
  return fibonacci(n);
});

/**
 * Iterative Solution
 * Approach:
 *   - Use a cache to store the Fibonacci numbers
 *   - Use a loop to calculate the Fibonacci number
 *   - If the Fibonacci number is already in the cache, return it
 *   - Otherwise, calculate the Fibonacci number and store it in the cache
 *   - Return the Fibonacci number
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const memoizationIterativeSolution = SolutionSchema.implement((n) => {
  const cache = new Array(n + 1);
  cache[0] = 0;
  cache[1] = 1;
  for (let i = 2; i <= n; i += 1) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }
  return cache[n];
});

/**
 * Iterative Space Optimized Solution
 * Approach:
 *   - Use a loop to calculate the Fibonacci number
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const iterativeSolution = SolutionSchema.implement((n) => {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i += 1) {
    const current = a + b;
    a = b;
    b = current;
  }
  return b;
});

/**
 * Matrix Exponentiation Solution
 * Approach:
 *   - Use a matrix to calculate the Fibonacci number
 *   - Return the Fibonacci number
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const matrixExponentiationSolution = SolutionSchema.implement((n) => {
  // Modulus (a prime number) to prevent overflow
  const MOD = 1e9 + 7;
  // Helper function to multiply two matrices in place
  function multiplyMatrixInPlace(
    matrix1: number[][],
    matrix2: number[][]
  ): number[][] {
    const new00 = matrix1[0][0] * matrix2[0][0] + matrix1[0][1] * matrix2[1][0];
    const new01 = matrix1[0][0] * matrix2[0][1] + matrix1[0][1] * matrix2[1][1];
    const new10 = matrix1[1][0] * matrix2[0][0] + matrix1[1][1] * matrix2[1][0];
    const new11 = matrix1[1][0] * matrix2[0][1] + matrix1[1][1] * matrix2[1][1];
    matrix1[0][0] = new00 % MOD;
    matrix1[0][1] = new01 % MOD;
    matrix1[1][0] = new10 % MOD;
    matrix1[1][1] = new11 % MOD;
    return matrix1;
  }
  // Helper function to calculate the power of a matrix in place
  function matrixPowerInPlace(matrix: number[][], power: number): number[][] {
    if (power === 0 || power === 1) {
      return matrix;
    }
    // Initialize the answer matrix as the identity matrix
    const answer = [
      [1, 0],
      [0, 1],
    ];
    // Fast exponentiation
    while (power > 0) {
      if (power & 1) {
        // Multiply the answer matrix by the matrix if the power is odd
        multiplyMatrixInPlace(answer, matrix);
      }
      // Square the matrix
      multiplyMatrixInPlace(matrix, matrix);
      // Divide the power by 2
      power >>= 1;
    }
    return answer;
  }
  // Function to find the Fibonacci number
  function nthFibonacci(n: number): number {
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }

    const result = matrixPowerInPlace(
      [
        [1, 1],
        [1, 0],
      ],
      n - 1
    );
    multiplyMatrixInPlace(result, [
      [1, 0],
      [0, 0],
    ]);
    return result[0][0] % MOD;
  }
  return nthFibonacci(n);
});

export const solutions = [
  memoizationRecursiveSolution,
  memoizationIterativeSolution,
  iterativeSolution,
  matrixExponentiationSolution,
];
