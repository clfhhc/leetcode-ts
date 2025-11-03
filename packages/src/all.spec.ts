import { createTestSuite, type ProblemModule } from './runner.js';

// Eager-import all problem modules from /problems
const modules = import.meta.glob<{
  solutions: ((...args: any[]) => any)[];
  cases: any[];
}>('../../problems/**/*.ts', { eager: true });

// Get filter options from environment variables
const filterProblem = process.env.TEST_PROBLEM;
const filterSolution = process.env.TEST_SOLUTION;

// Helper function to check if a path matches the problem filter
function matchesProblemFilter(path: string, filter: string): boolean {
  const fileName = path.split('/').pop()?.replace('.ts', '') || '';
  // Support both full name (e.g., "0278-first-bad-version") and partial match (e.g., "0278")
  return (
    fileName === filter ||
    fileName.startsWith(filter + '-') ||
    fileName.includes(filter)
  );
}

for (const [path, module] of Object.entries(modules) as [
  string,
  ProblemModule,
][]) {
  // Filter by problem if specified
  if (filterProblem && !matchesProblemFilter(path, filterProblem)) {
    continue;
  }

  // If solution filter is specified, we need to modify createTestSuite to accept it
  // For now, create the suite and let createTestSuite handle the filtering
  createTestSuite(path, module, filterSolution);
}
