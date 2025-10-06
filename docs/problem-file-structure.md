# Problem File Structure

Each problem file follows this structure:

```typescript
/**
 * 0001. Two Sum
 *
 * Difficulty: easy
 * Tags: array, hash-table
 *
 * Description:
 * Given an array of integers nums and an integer target...
 *
 * Approach:
 * - Use a hashmap to store complement -> index
 * - O(n) time, O(n) space
 */
import { z } from 'zod';
import type { ProblemMeta, TestCase } from '../packages/src/types.js';

export const meta: ProblemMeta = {
  id: 1,
  slug: 'two-sum',
  title: 'Two Sum',
  tags: ['array', 'hash-table'],
  difficulty: 'easy',
};

export const inputSchema = z.object({
  nums: z.array(z.number()),
  target: z.number(),
});

export type Input = z.infer<typeof inputSchema>;
export type Output = [number, number];

export function solve(input: Input): Output {
  // Your solution here
}

export const cases: TestCase<Input, Output>[] = [
  {
    input: { nums: [2, 7, 11, 15], target: 9 },
    expected: [0, 1],
    name: 'Example 1'
  },
  // More test cases...
];
```

## Required Exports

### `meta: ProblemMeta`
Contains metadata about the problem:
- `id`: Unique problem identifier
- `slug`: URL-friendly identifier
- `title`: Problem title
- `tags`: Array of topic tags
- `difficulty`: 'easy' | 'medium' | 'hard'

### `inputSchema: ZodSchema`
Zod schema for input validation and type inference.

### `solve: Function`
Your solution function that takes the input and returns the output.

### `cases: TestCase[]`
Array of test cases with input, expected output, and optional metadata.

## Documentation Format

Use TSDoc comments at the top of each file for:
- Problem description
- Approach explanation
- Time and space complexity analysis
- Any additional notes
