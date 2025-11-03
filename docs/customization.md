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
- **Base config**: `tsconfig.base.json` (shared settings, root level)
- **Package configs**: Individual `tsconfig.json` in each package

### Linting & Formatting

- **ESLint**: `eslint.config.js` (root level, flat config, ES modules)
- **Prettier**: `prettier.config.js` (root level, ES modules)
- **Note**: All configuration files use ES modules (`export default`). The project is configured with `"type": "module"` in `package.json`.

### Testing

- **Vitest**: `vitest.config.ts` (root level, test configuration)

**Note**: All configuration files are located at the project root for simplicity and consistency. This makes it easier to find and maintain configuration files.

## Workspace Structure

The project uses pnpm workspaces with the following structure:

```
leetcode-ts/
├── packages/           # Shared packages
│   └── src/           # Source code
├── apps/
│   └── site/          # Astro website
├── problems/          # LeetCode solutions
├── docs/              # Documentation
└── [config files]     # All config files at root (eslint, prettier, vitest, tsconfig)
```

## Dependencies

- **Root dependencies**: Shared across all packages
- **Package dependencies**: Specific to each package
- **Workspace references**: TypeScript project references
