import { createTestSuite, type ProblemModule } from './runner.js';

// Eager-import all problem modules from /problems
const modules = import.meta.glob<{
  meta: any;
  solve: Function;
  cases: any[];
}>('../../problems/**/*.ts', { eager: true });

for (const [path, module] of Object.entries(modules) as [string, ProblemModule][]) {
  createTestSuite(path, module);
}
