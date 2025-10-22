# Customization

## Adding New Problem Types

1. **Update types** in `packages/src/types.ts`
2. **Add validation schemas** using Zod
3. **Update the CLI** in `packages/src/new-problem.ts`

## Styling the Website

- **Global styles**: Edit `apps/site/src/layouts/Layout.astro`
- **Component styles**: Use Tailwind CSS in SolidJS components
- **Theme**: Modify `apps/site/tailwind.config.mjs`

## Adding New CLI Commands

1. **Add command** in `packages/src/cli.ts`
2. **Implement handler** in a new file
3. **Update package.json** scripts if needed

## Configuration Files

### TypeScript

- **Root config**: `tsconfig.json` (references all packages)
- **Base config**: `config/tsconfig.base.json` (shared settings)
- **Package configs**: Individual `tsconfig.json` in each package

### Linting & Formatting

- **ESLint**: `config/eslint.config.js` (shared rules)
- **Prettier**: `config/prettier.config.js` (code formatting)

### Testing

- **Vitest**: `config/vitest.config.ts` (test configuration)

## Workspace Structure

The project uses pnpm workspaces with the following structure:

```
leetcode-ts/
├── packages/           # Shared packages
│   └── src/           # Source code
├── apps/
│   └── site/          # Astro website
├── problems/          # LeetCode solutions
├── config/            # Shared configurations
└── docs/              # Documentation
```

## Dependencies

- **Root dependencies**: Shared across all packages
- **Package dependencies**: Specific to each package
- **Workspace references**: TypeScript project references
