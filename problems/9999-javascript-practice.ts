/**
 * 9999. TypeScript Practice Problems
 *
 * Difficulty: easy
 * Tags: 'typescript', 'arrays', 'loops', 'fundamentals'
 *
 * Description:
 * A collection of 10 practice problems to sharpen TypeScript skills:
 * 1. Create arithmetic sequence using for loop
 * 2. Create arithmetic sequence using Array.from
 * 3. Create geometric sequence using while loop
 * 4. Filter array elements using forEach
 * 5. Transform array using map
 * 6. Sum array elements using reduce
 * 7. Create multiplication table using nested loops
 * 8. Reverse string using different methods
 * 9. Count character frequencies using object
 * 10. Flatten nested arrays recursively
 *
 * Constraints:
 * - All problems should use TypeScript types properly
 * - Try to use different loop types and array methods
 * - Focus on clean, readable code
 */

import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

// ============================================================================
// Problem 1: Create Arithmetic Sequence using for loop
// ============================================================================
export const Problem1Schema = z.function({
  input: [z.number(), z.number(), z.number()], // start, difference, count
  output: z.array(z.number()),
});

export type Problem1Solution = z.infer<typeof Problem1Schema>;

export const problem1Cases: TestCase<Problem1Solution>[] = [
  {
    input: [1, 2, 5],
    expected: [1, 3, 5, 7, 9],
    name: 'Arithmetic: start=1, diff=2, count=5',
  },
  {
    input: [10, -3, 4],
    expected: [10, 7, 4, 1],
    name: 'Arithmetic: negative difference',
  },
  {
    input: [0, 5, 3],
    expected: [0, 5, 10],
    name: 'Arithmetic: start from zero',
  },
];

export const problem1Solution = Problem1Schema.implement(
  (start, diff, count) => {
    const array: number[] = [];
    for (let i = 0; i < count; i += 1) {
      array.push(i * diff + start);
    }
    return array;
  }
);

// ============================================================================
// Problem 2: Create Arithmetic Sequence using Array.from
// ============================================================================
export const Problem2Schema = z.function({
  input: [z.number(), z.number(), z.number()], // start, difference, count
  output: z.array(z.number()),
});

export type Problem2Solution = z.infer<typeof Problem2Schema>;

export const problem2Cases: TestCase<Problem2Solution>[] = [
  {
    input: [2, 3, 4],
    expected: [2, 5, 8, 11],
    name: 'Arithmetic with Array.from: start=2, diff=3, count=4',
  },
  {
    input: [100, -10, 5],
    expected: [100, 90, 80, 70, 60],
    name: 'Arithmetic with Array.from: descending',
  },
];

export const problem2Solution = Problem2Schema.implement(
  (start, diff, count) => {
    return Array.from({ length: count }, (_, i) => i * diff + start);
  }
);

// ============================================================================
// Problem 3: Create Geometric Sequence using while loop
// ============================================================================
export const Problem3Schema = z.function({
  input: [z.number(), z.number(), z.number()], // start, ratio, count
  output: z.array(z.number()),
});

export type Problem3Solution = z.infer<typeof Problem3Schema>;

export const problem3Cases: TestCase<Problem3Solution>[] = [
  {
    input: [2, 3, 4],
    expected: [2, 6, 18, 54],
    name: 'Geometric: start=2, ratio=3, count=4',
  },
  {
    input: [1, 2, 5],
    expected: [1, 2, 4, 8, 16],
    name: 'Geometric: powers of 2',
  },
  {
    input: [100, 0.5, 4],
    expected: [100, 50, 25, 12.5],
    name: 'Geometric: fractional ratio',
  },
];

export const problem3Solution = Problem3Schema.implement(
  (start, ratio, count) => {
    const array: number[] = [];
    let i = 0;
    while (i < count) {
      array[i] = start * ratio ** i;
      i += 1;
    }
    return array;
  }
);

// ============================================================================
// Problem 4: Filter array elements using forEach
// ============================================================================
export const Problem4Schema = z.function({
  input: [
    z.array(z.number()),
    z.function({ input: [z.number()], output: z.boolean() }),
  ], // array, predicate function
  output: z.array(z.number()),
});

export type Problem4Solution = z.infer<typeof Problem4Schema>;

export const problem4Cases: TestCase<Problem4Solution>[] = [
  {
    input: [[1, 2, 3, 4, 5], (n: number) => n % 2 === 0],
    expected: [2, 4],
    name: 'Filter even numbers using forEach',
  },
  {
    input: [[10, 20, 30, 40], (n: number) => n > 25],
    expected: [30, 40],
    name: 'Filter numbers greater than 25',
  },
];

export const problem4Solution = Problem4Schema.implement((arr, predicate) => {
  const array: number[] = [];
  arr.forEach((n) => {
    if (predicate(n)) {
      array.push(n);
    }
  });
  return array;
});

// ============================================================================
// Problem 5: Transform array using map
// ============================================================================
export const Problem5Schema = z.function({
  input: [z.array(z.number()), z.any()], // array, transform function
  output: z.array(z.any()),
});

export type Problem5Solution = z.infer<typeof Problem5Schema>;

export const problem5Cases: TestCase<Problem5Solution>[] = [
  {
    input: [[1, 2, 3, 4], (n: number) => n * n],
    expected: [1, 4, 9, 16],
    name: 'Square each number using map',
  },
  {
    input: [[1, 2, 3], (n: number) => n * 2 + 1],
    expected: [3, 5, 7],
    name: 'Transform: 2n+1',
  },
];

export const problem5Solution = Problem5Schema.implement((arr, transform) => {
  return arr.map(transform);
});

// ============================================================================
// Problem 6: Sum array elements using reduce
// ============================================================================
export const Problem6Schema = z.function({
  input: [z.array(z.number())],
  output: z.number(),
});

export type Problem6Solution = z.infer<typeof Problem6Schema>;

export const problem6Cases: TestCase<Problem6Solution>[] = [
  {
    input: [[1, 2, 3, 4, 5]],
    expected: 15,
    name: 'Sum: [1,2,3,4,5] = 15',
  },
  {
    input: [[10, -5, 3]],
    expected: 8,
    name: 'Sum: [10,-5,3] = 8',
  },
  {
    input: [[]],
    expected: 0,
    name: 'Sum: empty array = 0',
  },
];

export const problem6Solution = Problem6Schema.implement((arr) => {
  return arr.reduce((sum, n) => n + sum, 0);
});

// ============================================================================
// Problem 7: Create multiplication table using nested loops
// ============================================================================
export const Problem7Schema = z.function({
  input: [z.number()], // size (e.g., 5 → 5x5 table)
  output: z.array(z.array(z.number())),
});

export type Problem7Solution = z.infer<typeof Problem7Schema>;

export const problem7Cases: TestCase<Problem7Solution>[] = [
  {
    input: [3],
    expected: [
      [1, 2, 3],
      [2, 4, 6],
      [3, 6, 9],
    ],
    name: '3x3 multiplication table',
  },
  {
    input: [2],
    expected: [
      [1, 2],
      [2, 4],
    ],
    name: '2x2 multiplication table',
  },
];

export const problem7Solution = Problem7Schema.implement((size) => {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => i + 1 + j * (i + 1))
  );
});

// ============================================================================
// Problem 8: Reverse string using different methods
// ============================================================================
export const Problem8Schema = z.function({
  input: [z.string()],
  output: z.string(),
});

export type Problem8Solution = z.infer<typeof Problem8Schema>;

export const problem8ForLoopCases: TestCase<Problem8Solution>[] = [
  {
    input: ['hello'],
    expected: 'olleh',
    name: 'Reverse: "hello" → "olleh"',
  },
  {
    input: ['TypeScript'],
    expected: 'tpircSepyT',
    name: 'Reverse: "TypeScript"',
  },
  {
    input: ['a'],
    expected: 'a',
    name: 'Reverse: single character',
  },
];

export const problem8ForLoopSolution = Problem8Schema.implement((str) => {
  let reversedString = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    reversedString += str.charAt(i);
  }
  return reversedString;
});

export const problem8SplitCases = problem8ForLoopCases;

export const problem8SplitSolution = Problem8Schema.implement((str) => {
  return str.split('').reverse().join('');
});

export const problem8RecursionCases = problem8ForLoopCases;

export const problem8RecursionSolution = Problem8Schema.implement((str) => {
  if (str === '' || str.length === 1) {
    return str;
  }
  return problem8RecursionSolution(str.slice(1)) + str.charAt(0);
});

// ============================================================================
// Problem 9: Count character frequencies using object
// ============================================================================
export const Problem9Schema = z.function({
  input: [z.string()],
  output: z.record(z.string(), z.number()),
});

export type Problem9Solution = z.infer<typeof Problem9Schema>;

export const problem9Cases: TestCase<Problem9Solution>[] = [
  {
    input: ['hello'],
    expected: { h: 1, e: 1, l: 2, o: 1 },
    name: 'Count frequencies: "hello"',
  },
  {
    input: ['aabbcc'],
    expected: { a: 2, b: 2, c: 2 },
    name: 'Count frequencies: "aabbcc"',
  },
  {
    input: [''],
    expected: {},
    name: 'Count frequencies: empty string',
  },
];

export const problem9Solution = Problem9Schema.implement((str) => {
  return str.split('').reduce(
    (obj, char) => ({
      ...obj,
      [char]: (obj[char] ?? 0) + 1,
    }),
    {}
  );
});

// ============================================================================
// Problem 10: Flatten nested arrays recursively
// ============================================================================
export const Problem10Schema = z.function({
  input: [z.any()], // array that can contain numbers or nested arrays
  output: z.array(z.number()),
});

export type Problem10Solution = z.infer<typeof Problem10Schema>;

export const problem10Cases: TestCase<Problem10Solution>[] = [
  {
    input: [[1, [2, 3], [4, [5, 6]]]],
    expected: [1, 2, 3, 4, 5, 6],
    name: 'Flatten: [1, [2, 3], [4, [5, 6]]]',
  },
  {
    input: [[1, 2, 3]],
    expected: [1, 2, 3],
    name: 'Flatten: already flat array',
  },
  {
    input: [[[1], [2], [3]]],
    expected: [1, 2, 3],
    name: 'Flatten: nested single elements',
  },
];

export const problem10Solution = Problem10Schema.implement((arr) => {
  const current: any[] = [arr];
  const answer: any[] = [];
  while (current.length) {
    const item = current.shift();
    if (Array.isArray(item)) {
      current.push(...item);
    } else {
      answer.push(item);
    }
  }
  return answer;
});

// ============================================================================
// Export all solutions and cases
// ============================================================================
export const solutions = [
  problem1Solution,
  problem2Solution,
  problem3Solution,
  problem4Solution,
  problem5Solution,
  problem6Solution,
  problem7Solution,
  problem8ForLoopSolution,
  problem8SplitSolution,
  problem8RecursionSolution,
  problem9Solution,
  problem10Solution,
];
