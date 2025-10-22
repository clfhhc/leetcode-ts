# Contributing

Thank you for your interest in contributing! This guide will help you get started.

## Quick Start

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

## Adding New Problems

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

## Pull Request Process

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

## Reporting Issues

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

## Development Workflow

1. **Create a feature branch** from main
2. **Make your changes** following the coding standards
3. **Add tests** for new functionality
4. **Update documentation** if needed
5. **Run the full test suite** to ensure nothing is broken
6. **Submit a pull request** with a clear description

## Code Standards

- **Follow TypeScript best practices**
- **Write comprehensive tests**
- **Use descriptive commit messages**
- **Keep PRs focused and small**
- **Update documentation as needed**

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Astro Documentation](https://docs.astro.build/)
- [SolidJS Documentation](https://www.solidjs.com/docs)

## Community

- **GitHub Discussions** for questions and ideas
- **Pull Requests** for code contributions
- **Issues** for bug reports and feature requests

Thank you for contributing! 🎉
