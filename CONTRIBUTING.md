# Contributing to LeetCode TypeScript Solutions

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

1. **Fork and clone** the repository
2. **Setup development environment**:
   ```bash
   mise install
   pnpm install
   ```
3. **Create a new problem**:
   ```bash
   pnpm new
   ```
4. **Run tests** to ensure everything works:
   ```bash
   pnpm test
   ```

## 📝 Adding New Problems

### Using the CLI (Recommended)

```bash
pnpm new
```

Follow the prompts to create a new problem file with the correct structure.

### Manual Creation

If you prefer to create files manually, follow this structure:

1. **Create file**: `problems/XXXX-problem-slug.ts`
2. **Follow the template** in the existing problem files
3. **Include all required exports**: `meta`, `inputSchema`, `solve`, `cases`

## 🧪 Writing Test Cases

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
    name: 'Example 1: Basic case'
  },
  {
    input: { nums: [3, 3], target: 6 },
    expected: [0, 1],
    name: 'Example 2: Duplicate numbers'
  },
  {
    input: { nums: [1, 2, 3, 4, 5], target: 8 },
    expected: [2, 4],
    name: 'Custom: Multiple valid pairs'
  },
  {
    input: { nums: [1, 2], target: 4 },
    expected: null,
    name: 'Edge case: No solution'
  }
];
```

## 📚 Documentation Standards

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

## 🔍 Code Quality

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

## 🧪 Testing Guidelines

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

## 🏗️ Building and Previewing

### Local Development

```bash
# Build data from problems
pnpm build:data

# Build the website
pnpm build:site

# Start development server
pnpm dev
```

### Preview Changes

1. **Build the site**: `pnpm build`
2. **Preview locally**: `pnpm -C apps/site preview`
3. **Check the website** at `http://localhost:4321`

## 📋 Pull Request Process

### Before Submitting

1. **Run all tests**: `pnpm test`
2. **Check linting**: `pnpm lint`
3. **Format code**: `pnpm format`
4. **Type check**: `pnpm type-check`
5. **Build website**: `pnpm build`

### PR Description

Include:
- **Problem description** and approach
- **Test cases** added
- **Any breaking changes**
- **Screenshots** of the website (if UI changes)

### Review Process

- **All CI checks must pass**
- **Code review** by maintainers
- **Tests must be comprehensive**
- **Documentation must be clear**

## 🐛 Reporting Issues

### Bug Reports

Include:
- **Problem description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment details**

### Feature Requests

Include:
- **Use case description**
- **Proposed solution**
- **Alternative approaches considered**
- **Implementation complexity estimate**

## 🎯 Problem Selection

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

## 📖 Resources

- [LeetCode](https://leetcode.com/) - Problem source
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Astro Documentation](https://docs.astro.build/)

## 💡 Tips for Success

1. **Start with simple problems** to understand the structure
2. **Read existing solutions** to learn patterns
3. **Write tests first** (TDD approach)
4. **Focus on clarity** over cleverness
5. **Ask questions** if you're unsure

## 🤝 Community

- **GitHub Discussions** for questions and ideas
- **Pull Requests** for code contributions
- **Issues** for bug reports and feature requests

Thank you for contributing! 🎉
