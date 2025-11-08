/**
 * 9999. TypeScript Practice Problems
 *
 * Difficulty: easy
 * Tags: 'typescript', 'arrays', 'loops', 'fundamentals'
 *
 * Description:
 * A collection of 30 practice problems to sharpen TypeScript/JavaScript fundamentals:
 * 1. Create arithmetic sequence using for loop
 * 2. Create arithmetic sequence using Array.from
 * 3. Create geometric sequence using while loop
 * 4. Filter array elements using forEach
 * 5. Transform array using map
 * 6. Sum array elements using reduce
 * 7. Create multiplication table using nested loops
 * 8. Reverse string using different methods (3 variations)
 * 9. Count character frequencies using object
 * 10. Flatten nested arrays recursively
 * 11. Find maximum value in array
 * 12. Check if string is palindrome
 * 13. Remove duplicates from array
 * 14. Find index of element in array
 * 15. Merge two sorted arrays
 * 16. Calculate factorial
 * 17. Check if number is prime
 * 18. Rotate array to the right
 * 19. Find missing number in sequence
 * 20. Convert string to title case
 * 21. Find two numbers that sum to target
 * 22. Count vowels in string
 * 23. Find longest word in string
 * 24. Generate Fibonacci sequence
 * 25. Check if array is sorted
 * 26. Find all pairs with given sum
 * 27. Remove all occurrences of value
 * 28. Calculate average of array
 * 29. Find common elements in two arrays
 * 30. Chunk array into groups
 *
 * Constraints:
 * - All problems use TypeScript types properly
 * - Practice different loop types and array methods
 * - Focus on clean, readable code
 * - Build fundamental skills for algorithm problems
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
    Array.from({ length: size }, (_, j) => (i + 1) * (j + 1))
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

/**
 * Problem 9 Solution
 * Approach:
 *   - Iterate the chars in the string
 *   - create a hash map of the seen characters
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem9Solution = Problem9Schema.implement((str) => {
  return str.split('').reduce<Record<string, number>>((obj, char) => {
    obj[char] = (obj[char] ?? 0) + 1;
    return obj;
  }, {});
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
// Problem 11: Find maximum value in array
// ============================================================================
export const Problem11Schema = z.function({
  input: [z.array(z.number())],
  output: z.number(),
});

export type Problem11Solution = z.infer<typeof Problem11Schema>;

export const problem11Cases: TestCase<Problem11Solution>[] = [
  {
    input: [[3, 1, 4, 1, 5, 9, 2, 6]],
    expected: 9,
    name: 'Max: find maximum in array',
  },
  {
    input: [[-5, -2, -10, -1]],
    expected: -1,
    name: 'Max: all negative numbers',
  },
  {
    input: [[42]],
    expected: 42,
    name: 'Max: single element',
  },
];

/**
 * Problem 11 Solution
 * Approach:
 *   - Iterate the numbers in the array
 *   - Compare the number and the current maximum
 *   - Replace the current maximum with the number if the number is greater
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const problem11Solution = Problem11Schema.implement((arr) => {
  let max: number = -Infinity;
  arr.forEach((n) => {
    max = Math.max(max, n);
  });
  return max;
});

// ============================================================================
// Problem 12: Check if string is palindrome
// ============================================================================
export const Problem12Schema = z.function({
  input: [z.string()],
  output: z.boolean(),
});

export type Problem12Solution = z.infer<typeof Problem12Schema>;

export const problem12Cases: TestCase<Problem12Solution>[] = [
  {
    input: ['racecar'],
    expected: true,
    name: 'Palindrome: "racecar"',
  },
  {
    input: ['hello'],
    expected: false,
    name: 'Not palindrome: "hello"',
  },
  {
    input: ['a'],
    expected: true,
    name: 'Palindrome: single character',
  },
  {
    input: [''],
    expected: true,
    name: 'Palindrome: empty string',
  },
];

/**
 * Problem 12 Solution
 * Approach:
 *   - Iterate the characters from left to right and right to left
 *   - Compare the characters at the two pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const problem12Solution = Problem12Schema.implement((str) => {
  const end = Math.ceil(str.length / 2);
  for (let i = 0; i < end; i += 1) {
    if (str.charAt(i) !== str.charAt(str.length - 1 - i)) {
      return false;
    }
  }
  return true;
});

// ============================================================================
// Problem 13: Remove duplicates from array
// ============================================================================
export const Problem13Schema = z.function({
  input: [z.array(z.number())],
  output: z.array(z.number()),
});

export type Problem13Solution = z.infer<typeof Problem13Schema>;

export const problem13Cases: TestCase<Problem13Solution>[] = [
  {
    input: [[1, 2, 2, 3, 4, 4, 5]],
    expected: [1, 2, 3, 4, 5],
    name: 'Remove duplicates: [1,2,2,3,4,4,5]',
  },
  {
    input: [[1, 1, 1, 1]],
    expected: [1],
    name: 'Remove duplicates: all same',
  },
  {
    input: [[1, 2, 3]],
    expected: [1, 2, 3],
    name: 'Remove duplicates: no duplicates',
  },
];

/**
 * Problem 13 Solution
 * Approach:
 *   - Iterate the elements in the array
 *   - Create a hash map of the seen elements
 *   - Remove the elements that were seen
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem13Solution = Problem13Schema.implement((arr) => {
  const seen = new Set<number>();
  return arr.filter((e) => {
    if (seen.has(e)) {
      return false;
    }
    seen.add(e);
    return true;
  });
});

// ============================================================================
// Problem 14: Find index of element in array
// ============================================================================
export const Problem14Schema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.number(),
});

export type Problem14Solution = z.infer<typeof Problem14Schema>;

export const problem14Cases: TestCase<Problem14Solution>[] = [
  {
    input: [[10, 20, 30, 40, 50], 30],
    expected: 2,
    name: 'Find index: element exists',
  },
  {
    input: [[10, 20, 30, 40, 50], 100],
    expected: -1,
    name: 'Find index: element not found',
  },
  {
    input: [[5], 5],
    expected: 0,
    name: 'Find index: single element',
  },
];

/**
 * Problem 14 Solution
 * Approach:
 *   - Iterate the elements in the array
 *   - Return the index of the element if the element is the same as target
 *   - return -1 if all the elements are not the same as target
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const problem14Solution = Problem14Schema.implement((arr, target) => {
  return arr.indexOf(target);
});

// ============================================================================
// Problem 15: Merge two sorted arrays
// ============================================================================
export const Problem15Schema = z.function({
  input: [z.array(z.number()), z.array(z.number())],
  output: z.array(z.number()),
});

export type Problem15Solution = z.infer<typeof Problem15Schema>;

export const problem15Cases: TestCase<Problem15Solution>[] = [
  {
    input: [
      [1, 3, 5],
      [2, 4, 6],
    ],
    expected: [1, 2, 3, 4, 5, 6],
    name: 'Merge: two equal-length arrays',
  },
  {
    input: [
      [1, 2, 3],
      [4, 5],
    ],
    expected: [1, 2, 3, 4, 5],
    name: 'Merge: different lengths',
  },
  {
    input: [[], [1, 2, 3]],
    expected: [1, 2, 3],
    name: 'Merge: one empty array',
  },
];

/**
 * Problem 15 Solution
 * Approach:
 *   - Have two pointers
 *   - One pointer starts from the first element of the first array
 *   - One pointer starts from the first element of the second array
 *   - Move the pointer to the next one in its array only if the pointer is smaller than the other pointer
 *   - add the pointer to the result array before moving
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem15Solution = Problem15Schema.implement((arr1, arr2) => {
  const result: number[] = [];
  let i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  return result.concat(arr1.slice(i), arr2.slice(j));
});

// ============================================================================
// Problem 16: Calculate factorial
// ============================================================================
export const Problem16Schema = z.function({
  input: [z.number()],
  output: z.number(),
});

export type Problem16Solution = z.infer<typeof Problem16Schema>;

export const problem16Cases: TestCase<Problem16Solution>[] = [
  {
    input: [5],
    expected: 120,
    name: 'Factorial: 5! = 120',
  },
  {
    input: [0],
    expected: 1,
    name: 'Factorial: 0! = 1',
  },
  {
    input: [1],
    expected: 1,
    name: 'Factorial: 1! = 1',
  },
  {
    input: [7],
    expected: 5040,
    name: 'Factorial: 7! = 5040',
  },
];

/**
 * Problem 16 Solution
 * Approach:
 *   - Times the (step + 1) iteratively
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const problem16Solution = Problem16Schema.implement((n) => {
  let result = 1;
  for (let i = 1; i <= n; i += 1) {
    result *= i;
  }
  return result;
});

// ============================================================================
// Problem 17: Check if number is prime
// ============================================================================
export const Problem17Schema = z.function({
  input: [z.number()],
  output: z.boolean(),
});

export type Problem17Solution = z.infer<typeof Problem17Schema>;

export const problem17Cases: TestCase<Problem17Solution>[] = [
  {
    input: [7],
    expected: true,
    name: 'Prime: 7 is prime',
  },
  {
    input: [10],
    expected: false,
    name: 'Not prime: 10 is not prime',
  },
  {
    input: [2],
    expected: true,
    name: 'Prime: 2 is prime',
  },
  {
    input: [1],
    expected: false,
    name: 'Not prime: 1 is not prime',
  },
];

/**
 * Problem 17 Solution
 * Approach:
 *   - Iterate from 2 to the number - 1
 *   - See if the number can divide the number
 * Time Complexity: O(n^0.5)
 * Space Complexity: O(1)
 */
export const problem17Solution = Problem17Schema.implement((n) => {
  if (n <= 1) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }
  for (let i = 3; i < Math.sqrt(n); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
});

// ============================================================================
// Problem 18: Rotate array to the right
// ============================================================================
export const Problem18Schema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.array(z.number()),
});

export type Problem18Solution = z.infer<typeof Problem18Schema>;

export const problem18Cases: TestCase<Problem18Solution>[] = [
  {
    input: [[1, 2, 3, 4, 5], 2],
    expected: [4, 5, 1, 2, 3],
    name: 'Rotate: [1,2,3,4,5] right by 2',
  },
  {
    input: [[1, 2, 3], 4],
    expected: [3, 1, 2],
    name: 'Rotate: steps > length',
  },
  {
    input: [[1, 2, 3, 4], 0],
    expected: [1, 2, 3, 4],
    name: 'Rotate: 0 steps',
  },
];

/**
 * Problem 18 Solution
 * Approach:
 *   - Find the modulo of the (array length - target) divide the length of array
 *   - split the array at the modulo
 *   - combine the right split and left split
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem18Solution = Problem18Schema.implement((arr, k) => {
  const index = (arr.length - k) % arr.length;
  return arr.slice(index).concat(arr.slice(0, index));
});

// ============================================================================
// Problem 19: Find missing number in sequence
// ============================================================================
export const Problem19Schema = z.function({
  input: [z.array(z.number())],
  output: z.number(),
});

export type Problem19Solution = z.infer<typeof Problem19Schema>;

export const problem19Cases: TestCase<Problem19Solution>[] = [
  {
    input: [[0, 1, 3, 4, 5]],
    expected: 2,
    name: 'Missing: 2 in [0,1,3,4,5]',
  },
  {
    input: [[1, 2, 3, 4]],
    expected: 0,
    name: 'Missing: 0 in [1,2,3,4]',
  },
  {
    input: [[0]],
    expected: 1,
    name: 'Missing: 1 in [0]',
  },
];

/**
 * Problem 19 Solution
 * Approach:
 *   - Iterate the element in the array
 *   - Compare the element with the index
 *   - return the index if there's inconsistency
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const problem19Solution = Problem19Schema.implement((arr) => {
  if (arr.length === 0) {
    return 0;
  }
  const index = arr.findIndex((n, i) => i !== n);
  return index === -1 ? arr.length : index;
});

// ============================================================================
// Problem 20: Convert string to title case
// ============================================================================
export const Problem20Schema = z.function({
  input: [z.string()],
  output: z.string(),
});

export type Problem20Solution = z.infer<typeof Problem20Schema>;

export const problem20Cases: TestCase<Problem20Solution>[] = [
  {
    input: ['hello world'],
    expected: 'Hello World',
    name: 'Title case: "hello world"',
  },
  {
    input: ['the quick brown fox'],
    expected: 'The Quick Brown Fox',
    name: 'Title case: multiple words',
  },
  {
    input: ['a'],
    expected: 'A',
    name: 'Title case: single letter',
  },
];

/**
 * Problem 20 Solution
 * Approach:
 *   - Find the first letter that has no letter before
 *   - Replace that with upper letter
 * Time Complexity: O(n)
 * Space Complexity: O(n) (strings are immutable in JavaScript)
 */
export const problem20Solution = Problem20Schema.implement((str) => {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
});

// ============================================================================
// Problem 21: Find two numbers that sum to target
// ============================================================================
export const Problem21Schema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.array(z.number()).nullable(),
});

export type Problem21Solution = z.infer<typeof Problem21Schema>;

export const problem21Cases: TestCase<Problem21Solution>[] = [
  {
    input: [[2, 7, 11, 15], 9],
    expected: [2, 7],
    name: 'Two sum: found pair [2,7]',
  },
  {
    input: [[1, 2, 3, 4], 10],
    expected: null,
    name: 'Two sum: no pair found',
  },
  {
    input: [[3, 3], 6],
    expected: [3, 3],
    name: 'Two sum: same number twice',
  },
];

/**
 * Problem 21 Solution
 * Approach:
 *   - Use a hash map to store number -> index mappings
 *   - For each number, check if its complement (target - number) exists in the map
 *   - If found, return the indices; otherwise, store current number and index
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem21Solution = Problem21Schema.implement((arr, target) => {
  const complement: Record<number, number> = {};
  for (let i = 0; i < arr.length; i += 1) {
    if (complement[arr[i]] != null) {
      return [target - arr[i], arr[i]];
    } else {
      complement[target - arr[i]] = i;
    }
  }
  return null;
});

// ============================================================================
// Problem 22: Count vowels in string
// ============================================================================
export const Problem22Schema = z.function({
  input: [z.string()],
  output: z.number(),
});

export type Problem22Solution = z.infer<typeof Problem22Schema>;

export const problem22Cases: TestCase<Problem22Solution>[] = [
  {
    input: ['hello'],
    expected: 2,
    name: 'Count vowels: "hello" has 2',
  },
  {
    input: ['typescript'],
    expected: 2,
    name: 'Count vowels: "typescript" has 2',
  },
  {
    input: ['aeiou'],
    expected: 5,
    name: 'Count vowels: all vowels',
  },
  {
    input: ['xyz'],
    expected: 0,
    name: 'Count vowels: no vowels',
  },
];

export const vowels = new Set(['a', 'o', 'e', 'i', 'u']);

/**
 * Problem 22 Solution
 * Approach:
 *   - Use a hash map to store vowels
 *   - for each character, check if vowels exists
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const problem22Solution = Problem22Schema.implement((str) => {
  let count = 0;
  for (const char of str) {
    if (vowels.has(char)) {
      count += 1;
    }
  }
  return count;
});

// ============================================================================
// Problem 23: Find longest word in string
// ============================================================================
export const Problem23Schema = z.function({
  input: [z.string()],
  output: z.string(),
});

export type Problem23Solution = z.infer<typeof Problem23Schema>;

export const problem23Cases: TestCase<Problem23Solution>[] = [
  {
    input: ['The quick brown fox'],
    expected: 'quick',
    name: 'Longest word: "quick"',
  },
  {
    input: ['I love programming'],
    expected: 'programming',
    name: 'Longest word: "programming"',
  },
  {
    input: ['a bb ccc'],
    expected: 'ccc',
    name: 'Longest word: "ccc"',
  },
];

/**
 * Problem 23 Solution
 * Approach:
 *   - Iterate over the string
 *   - use a counter to store the current longest string
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem23Solution = Problem23Schema.implement((str) => {
  return str
    .split(' ')
    .reduce(
      (longest, word) => (longest.length < word.length ? word : longest),
      ''
    );
});

// ============================================================================
// Problem 24: Generate Fibonacci sequence
// ============================================================================
export const Problem24Schema = z.function({
  input: [z.number()],
  output: z.array(z.number()),
});

export type Problem24Solution = z.infer<typeof Problem24Schema>;

export const problem24Cases: TestCase<Problem24Solution>[] = [
  {
    input: [5],
    expected: [0, 1, 1, 2, 3],
    name: 'Fibonacci: first 5 numbers',
  },
  {
    input: [1],
    expected: [0],
    name: 'Fibonacci: first 1 number',
  },
  {
    input: [8],
    expected: [0, 1, 1, 2, 3, 5, 8, 13],
    name: 'Fibonacci: first 8 numbers',
  },
];

/**
 * Problem 24 Solution
 * Approach:
 *   - use 0, 1 as the beginning
 *   - for the rest of the steps, append the sum of the previous 2 numbers
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem24Solution = Problem24Schema.implement((n) => {
  if (n === 1) {
    return [0];
  }
  if (n === 2) {
    return [0, 1];
  }
  const result: number[] = Array.from({ length: n }, (_, i) => {
    if (i === 0) {
      return 0;
    }
    return 1;
  });
  for (let i = 2; i < n; i += 1) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result;
});

// ============================================================================
// Problem 25: Check if array is sorted
// ============================================================================
export const Problem25Schema = z.function({
  input: [z.array(z.number())],
  output: z.boolean(),
});

export type Problem25Solution = z.infer<typeof Problem25Schema>;

export const problem25Cases: TestCase<Problem25Solution>[] = [
  {
    input: [[1, 2, 3, 4, 5]],
    expected: true,
    name: 'Sorted: ascending order',
  },
  {
    input: [[1, 3, 2, 4]],
    expected: false,
    name: 'Not sorted: mixed order',
  },
  {
    input: [[5]],
    expected: true,
    name: 'Sorted: single element',
  },
];

/**
 * Problem 25 Solution
 * Approach:
 *   - Iterate over the array
 *   - compare the current element with the last element
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export const problem25Solution = Problem25Schema.implement((arr) =>
  arr.every((n, i) => {
    if (i === 0) {
      return true;
    }
    return arr[i - 1] <= n;
  })
);

// ============================================================================
// Problem 26: Find all pairs with given sum
// ============================================================================
export const Problem26Schema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.array(z.array(z.number())),
});

export type Problem26Solution = z.infer<typeof Problem26Schema>;

export const problem26Cases: TestCase<Problem26Solution>[] = [
  {
    input: [[1, 2, 3, 4, 5], 5],
    expected: [
      [1, 4],
      [2, 3],
    ],
    name: 'Pairs: sum to 5',
  },
  {
    input: [[1, 1, 1, 1], 2],
    expected: [
      [1, 1],
      [1, 1],
    ],
    name: 'Pairs: duplicates (each element used once)',
  },
  {
    input: [[1, 2, 3], 10],
    expected: [],
    name: 'Pairs: no pairs found',
  },
];

/**
 * Problem 26 Solution
 * Approach:
 *   - Iterate over the array
 *   - Track used indices to ensure each element is only used once
 *   - Return all valid pairs found
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const problem26Solution = Problem26Schema.implement((arr, target) => {
  const complement = new Set<number>();
  const result: [number, number][] = [];
  arr.forEach((n) => {
    if (complement.has(n)) {
      result.push([target - n, n]);
      complement.delete(n);
    } else {
      complement.add(target - n);
    }
  });
  result.sort((a, b) => a[0] - b[0]);
  return result;
});

// ============================================================================
// Problem 27: Remove all occurrences of value
// ============================================================================
export const Problem27Schema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.array(z.number()),
});

export type Problem27Solution = z.infer<typeof Problem27Schema>;

export const problem27Cases: TestCase<Problem27Solution>[] = [
  {
    input: [[1, 2, 3, 2, 4], 2],
    expected: [1, 3, 4],
    name: 'Remove: all 2s',
  },
  {
    input: [[5, 5, 5, 5], 5],
    expected: [],
    name: 'Remove: all elements',
  },
  {
    input: [[1, 2, 3], 4],
    expected: [1, 2, 3],
    name: 'Remove: value not present',
  },
];

/**
 * Problem 27 Solution
 * Approach:
 *   - filter all the elements that are not equal to the value
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem27Solution = Problem27Schema.implement((arr, value) =>
  arr.filter((n) => n !== value)
);

// ============================================================================
// Problem 28: Calculate average of array
// ============================================================================
export const Problem28Schema = z.function({
  input: [z.array(z.number())],
  output: z.number().nullable(),
});

export type Problem28Solution = z.infer<typeof Problem28Schema>;

export const problem28Cases: TestCase<Problem28Solution>[] = [
  {
    input: [[1, 2, 3, 4, 5]],
    expected: 3,
    name: 'Average: [1,2,3,4,5] = 3',
  },
  {
    input: [[10, 20, 30]],
    expected: 20,
    name: 'Average: [10,20,30] = 20',
  },
  {
    input: [[5]],
    expected: 5,
    name: 'Average: single element',
  },
];

export const problem28Solution = Problem28Schema.implement((arr) => {
  if (arr.length === 0) {
    return null;
  }
  return arr.reduce((sum, n) => sum + n, 0) / arr.length;
});

// ============================================================================
// Problem 29: Find common elements in two arrays
// ============================================================================
export const Problem29Schema = z.function({
  input: [z.array(z.number()), z.array(z.number())],
  output: z.array(z.number()),
});

export type Problem29Solution = z.infer<typeof Problem29Schema>;

export const problem29Cases: TestCase<Problem29Solution>[] = [
  {
    input: [
      [1, 2, 3, 4],
      [3, 4, 5, 6],
    ],
    expected: [3, 4],
    name: 'Common: [3,4]',
  },
  {
    input: [
      [1, 2, 3],
      [4, 5, 6],
    ],
    expected: [],
    name: 'Common: no common elements',
  },
  {
    input: [
      [1, 1, 2, 2],
      [1, 2, 3],
    ],
    expected: [1, 2],
    name: 'Common: with duplicates',
  },
];

/**
 * Problem 29 Solution
 * Approach:
 *   - find the sets of two arrays
 *   - find the intersection of two sets
 * Time Complexity: O(m + n)
 * Space Complexity: O(m + n)
 */
export const problem29Solution = Problem29Schema.implement((arr1, arr2) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const intersection: number[] = [];
  set1.forEach((n) => {
    if (set2.has(n)) {
      intersection.push(n);
    }
  });
  return intersection;
});

// ============================================================================
// Problem 30: Chunk array into groups
// ============================================================================
export const Problem30Schema = z.function({
  input: [z.array(z.number()), z.number()],
  output: z.array(z.array(z.number())),
});

export type Problem30Solution = z.infer<typeof Problem30Schema>;

export const problem30Cases: TestCase<Problem30Solution>[] = [
  {
    input: [[1, 2, 3, 4, 5, 6], 2],
    expected: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    name: 'Chunk: size 2',
  },
  {
    input: [[1, 2, 3, 4, 5], 3],
    expected: [
      [1, 2, 3],
      [4, 5],
    ],
    name: 'Chunk: uneven division',
  },
  {
    input: [[1, 2, 3], 5],
    expected: [[1, 2, 3]],
    name: 'Chunk: size larger than array',
  },
];

/**
 * Problem 30 Solution
 * Approach:
 *   - chunk the array by the target chunk size
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export const problem30Solution = Problem30Schema.implement((arr, size) => {
  const result: number[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
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
  problem11Solution,
  problem12Solution,
  problem13Solution,
  problem14Solution,
  problem15Solution,
  problem16Solution,
  problem17Solution,
  problem18Solution,
  problem19Solution,
  problem20Solution,
  problem21Solution,
  problem22Solution,
  problem23Solution,
  problem24Solution,
  problem25Solution,
  problem26Solution,
  problem27Solution,
  problem28Solution,
  problem29Solution,
  problem30Solution,
];
