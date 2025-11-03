import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import { createRequire } from 'module';
import prettierPlugin from 'eslint-plugin-prettier';

const require = createRequire(import.meta.url);
const eslintConfigPrettier = require('eslint-config-prettier');

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        performance: 'readonly',
        fetch: 'readonly',
        URLSearchParams: 'readonly',
        window: 'readonly',
        location: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'prettier/prettier': 'error',
    },
  },
  {
    rules: {
      ...eslintConfigPrettier.rules,
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/.prettierrc.mjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: ['**/*.tsx'],
    languageOptions: {
      globals: {
        URLSearchParams: 'readonly',
        window: 'readonly',
        location: 'readonly',
        document: 'readonly',
      },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    ignores: ['dist/', 'build/', 'node_modules/', '*.config.js', 'apps/site/dist'],
  },
];
