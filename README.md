# LeetCode TypeScript Solutions

A modern, type-safe approach to solving LeetCode problems with TypeScript, featuring automated testing, beautiful documentation, and a static website generator.

## 🚀 Features

- **One-file solutions**: Each problem lives in a single TypeScript file with solution, tests, and documentation
- **Type-safe testing**: Zod schemas for input validation and TypeScript for type safety
- **Automated testing**: Vitest runs all problem tests automatically
- **Static website**: Astro-powered site with React components for browsing solutions
- **Modern tooling**: Mise for Node.js management, pnpm for package management
- **CI/CD**: GitHub Actions for testing and GitHub Pages deployment

## 🏗️ Architecture

```
leetcode-ts/
├── problems/           # Your LeetCode solutions (one file per problem)
├── packages/
│   ├── types/         # Shared TypeScript types and Zod schemas
│   ├── runner/        # Generic test runner for all problems
│   └── cli/           # CLI tools for scaffolding and data generation
├── apps/
│   └── site/          # Astro static website
└── config/            # Shared configuration files
```

## 🛠️ Development Setup

### Prerequisites

- [Mise](https://mise.jdx.dev/) for Node.js version management
- [pnpm](https://pnpm.io/) for package management

### Installation

1. **Clone and setup**:
   ```bash
   git clone <your-repo-url>
   cd leetcode-ts
   mise install  # Installs Node.js and pnpm versions from .mise.toml
   pnpm install  # Installs all dependencies
   ```

2. **Create your first problem**:
   ```bash
   pnpm new
   # Follow the prompts to create a new problem file
   ```

3. **Run tests**:
   ```bash
   pnpm test        # Run all tests once
   pnpm test:watch  # Run tests in watch mode
   ```

4. **Build and view the website**:
   ```bash
   pnpm build:data  # Generate data from problems
   pnpm build:site  # Build the static site
   pnpm dev         # Start development server
   ```

## 📝 Problem File Structure

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
import type { ProblemMeta, TestCase } from '@types';

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

## 🎯 Available Scripts

- `pnpm new` - Create a new problem file
- `pnpm test` - Run all problem tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm build:data` - Generate website data from problems
- `pnpm build:site` - Build the static website
- `pnpm build` - Build both data and site
- `pnpm dev` - Start development server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## 🌐 Website Features

The generated website includes:

- **Problem listing** with search and filtering
- **Individual problem pages** with:
  - Problem description and approach notes
  - Syntax-highlighted code
  - Test case results with pass/fail status
  - Performance metrics
- **Responsive design** with dark mode support
- **Static generation** for fast loading

## 🚀 Deployment

The repository is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Push to main branch** - the site will build and deploy automatically

The site will be available at: `https://your-username.github.io/leetcode-ts`

## 🔧 Customization

### Adding New Problem Types

1. **Update types** in `packages/types/src/index.ts`
2. **Add validation schemas** using Zod
3. **Update the CLI** in `packages/cli/src/new-problem.ts`

### Styling the Website

- **Global styles**: Edit `apps/site/src/layouts/Layout.astro`
- **Component styles**: Use Tailwind CSS in React components
- **Theme**: Modify `apps/site/tailwind.config.mjs`

### Adding New CLI Commands

1. **Add command** in `packages/cli/src/index.ts`
2. **Implement handler** in a new file
3. **Update package.json** scripts if needed

## 📚 Best Practices

1. **Write comprehensive test cases** - include edge cases and error conditions
2. **Document your approach** - explain the algorithm and complexity
3. **Use descriptive names** - for variables, functions, and test cases
4. **Follow TypeScript best practices** - use strict types and avoid `any`
5. **Keep solutions focused** - one problem per file, clear separation of concerns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your solutions following the established patterns
4. Run tests and ensure they pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

Happy coding! 🎉
