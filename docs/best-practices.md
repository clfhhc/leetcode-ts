# Best Practices

## Writing Solutions

1. **Write comprehensive test cases** - include edge cases and error conditions
2. **Document your approach** - explain the algorithm and complexity
3. **Use descriptive names** - for variables, functions, and test cases
4. **Follow TypeScript best practices** - use strict types and avoid `any`
5. **Keep solutions focused** - one problem per file, clear separation of concerns

## Test Case Guidelines

### Good Test Cases Include:

- **Example cases** from the problem description
- **Edge cases** (empty inputs, single elements, etc.)
- **Boundary conditions** (maximum values, minimum values)
- **Error conditions** (invalid inputs, no solution cases)
- **Descriptive names** for each test case

### Example:

```typescript
export const cases: TestCase<Input, Output>[] = [
  {
    input: { nums: [2, 7, 11, 15], target: 9 },
    expected: [0, 1],
    name: 'Example 1: Basic case',
  },
  {
    input: { nums: [3, 3], target: 6 },
    expected: [0, 1],
    name: 'Example 2: Duplicate numbers',
  },
  {
    input: { nums: [1, 2, 3, 4, 5], target: 8 },
    expected: [2, 4],
    name: 'Custom: Multiple valid pairs',
  },
  {
    input: { nums: [1, 2], target: 4 },
    expected: null,
    name: 'Edge case: No solution',
  },
];
```

## Documentation Standards

### Problem Documentation

Use TSDoc comments at the top of each file:

```typescript
/**
 * 0001. Two Sum
 *
 * Difficulty: easy
 * Tags: array, hash-table
 *
 * Description:
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * Approach:
 * - Use a hashmap to store complement -> index
 * - For each number, check if its complement exists
 * - Time: O(n), Space: O(n)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
```

### Code Documentation

- **Explain complex algorithms** with inline comments
- **Use descriptive variable names**
- **Add JSDoc comments** for complex functions
- **Include complexity analysis** in comments

## Code Quality

### Module System

- **Use ES modules** - All files use `import`/`export` syntax
- **No CommonJS** - Avoid `require()` and `module.exports`
- **Type imports** - Use `import type` for type-only imports when appropriate

### TypeScript Best Practices

- **Use strict types** - avoid `any` when possible
- **Define proper interfaces** for complex data structures
- **Use Zod schemas** for input validation
- **Leverage TypeScript's type system** for better code safety

### Code Style

- **Follow existing patterns** in the codebase
- **Use consistent naming** conventions
- **Keep functions focused** and single-purpose
- **Write clean, readable code**

## Testing Guidelines

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific problem
pnpm test problems/0001-two-sum.ts
```

### Test Requirements

- **All tests must pass** before submitting
- **Add tests for new functionality**
- **Update tests when changing behavior**
- **Test edge cases and error conditions**

## Problem Selection

### Good Problems to Add

- **Classic algorithms** (sorting, searching, etc.)
- **Data structure problems** (trees, graphs, etc.)
- **Dynamic programming** problems
- **String manipulation** problems
- **Math and number theory** problems

### Problem Requirements

- **Clear problem statement**
- **Well-defined input/output**
- **Multiple test cases available**
- **Educational value**
