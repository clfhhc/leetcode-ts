import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import { createRequire } from 'module';
import prettierPlugin from 'eslint-plugin-prettier';

const require = createRequire(import.meta.url);
const eslintConfigPrettier = require('eslint-config-prettier');

/** @type {import('eslint').Linter.Config} */
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
    ignores: ['dist/', 'build/', 'node_modules/', '*.config.js'],
  },
];
