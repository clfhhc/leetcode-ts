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

## Available Scripts

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
