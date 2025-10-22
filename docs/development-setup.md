# Development Setup

## Prerequisites

- [Mise](https://mise.jdx.dev/) for Node.js version management
- [pnpm](https://pnpm.io/) for package management

## Installation

1. **Clone and setup**:

   ```bash
   git clone <your-repo-url>
   cd leetcode-ts
   mise install  # Installs Node.js and pnpm versions from .mise.toml
   pnpm install  # Installs all dependencies
   ```

2. **Create your first problem**:

   ```bash
   # Create a new problem manually
   pnpm new
   # Follow the prompts to create a new problem file

   # Or fetch from LeetCode
   pnpm new --from-leetcode --leetcode-slug two-sum
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
   pnpm build       # Build both data and site
   pnpm dev         # Start development mode (data watching + site dev server)
   ```

## Available Scripts

All scripts now use the unified CLI (`packages/src/cli.ts`):

- `pnpm new` - Create a new problem file (supports `--from-leetcode` and `--leetcode-slug` options)
- `pnpm test` - Run all problem tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm build:data` - Generate website data from problems
- `pnpm build:site` - Build the static website
- `pnpm build` - Build both data and site
- `pnpm dev` - Start development mode (data watching + site dev server)
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## Typical Workflow

1. **Create a new problem from LeetCode**:

   ```bash
   pnpm new --from-leetcode --leetcode-slug [leetcode-slug]
   ```

2. **Solve the problem**:
   - Edit the generated file in `problems/[leetcode-slug].ts`
   - Add your solution and test cases

3. **Build and view**:
   ```bash
   pnpm build:data  # Generate data from your solution
   pnpm build:site  # Build the website
   # OR
   pnpm dev         # Start development mode for live updates
   ```
