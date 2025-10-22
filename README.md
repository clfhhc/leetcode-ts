# LeetCode TypeScript Solutions

A modern, type-safe approach to solving LeetCode problems with TypeScript, featuring automated testing, beautiful documentation, and a static website generator.

## 🚀 Features

- **One-file solutions**: Each problem lives in a single TypeScript file with solution, tests, and documentation
- **Type-safe testing**: Zod schemas for input validation and TypeScript for type safety
- **Automated testing**: Vitest runs all problem tests automatically
- **Static website**: Astro-powered site with SolidJS components for browsing solutions
- **Modern tooling**: Mise for Node.js management, pnpm for package management
- **CI/CD**: GitHub Actions for testing and GitHub Pages deployment

## 🏗️ Architecture

```
leetcode-ts/
├── problems/           # Your LeetCode solutions (one file per problem)
├── packages/           # Shared packages (types, runner, CLI)
├── apps/
│   └── site/          # Astro static website
├── config/            # Shared configuration files
└── docs/              # Documentation
```

## 🛠️ Quick Start

### Prerequisites

- [Mise](https://mise.jdx.dev/) for Node.js version management
- [pnpm](https://pnpm.io/) for package management

### Installation

```bash
git clone <your-repo-url>
cd leetcode-ts
mise install  # Installs Node.js and pnpm versions
pnpm install  # Installs all dependencies
```

### Usage

```bash
# Create a new problem from LeetCode
pnpm new --from-leetcode --leetcode-slug two-sum

# Or create manually
pnpm new

# Run tests
pnpm test

# Start development mode (data watching + site dev server)
pnpm dev

# Build website
pnpm build
```

## 📚 Documentation

- [Development Setup](docs/development-setup.md) - Detailed setup instructions
- [Problem File Structure](docs/problem-file-structure.md) - How to structure problem files
- [Website Features](docs/website-features.md) - What the generated website includes
- [Deployment](docs/deployment.md) - How to deploy to GitHub Pages
- [Customization](docs/customization.md) - How to customize the project
- [Best Practices](docs/best-practices.md) - Coding standards and guidelines
- [Contributing](docs/contributing.md) - How to contribute to the project

## 🎯 Available Scripts

All scripts use the unified CLI (`packages/src/cli.ts`):

- `pnpm new` - Create a new problem file (supports `--from-leetcode` and `--leetcode-slug` options)
- `pnpm test` - Run all problem tests
- `pnpm build:data` - Generate website data from problems
- `pnpm build:site` - Build the static website
- `pnpm build` - Build both data and site
- `pnpm dev` - Start development mode (data watching + site dev server)
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🌐 Website

The generated website includes:

- Problem listing with search and filtering
- Individual problem pages with code, tests, and documentation
- Responsive design with dark mode support
- Static generation for fast loading

## 🚀 Deployment

The repository is configured for automatic deployment to GitHub Pages. See [Deployment Guide](docs/deployment.md) for setup instructions.

## 📄 License

MIT License - see LICENSE file for details.

---

Happy coding! 🎉
