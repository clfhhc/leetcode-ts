import { describe, it, expect } from 'vitest';
import { createTestSuite } from './index.js';

// Eager-import all problem modules from /problems
const modules = import.meta.glob<{
  meta: any;
  solve: Function;
  cases: any[];
}>('/Users/davidchenallio/src/leetcode-ts/problems/**/*.ts', { eager: true });

for (const [path, module] of Object.entries(modules)) {
  createTestSuite(path, module);
}
