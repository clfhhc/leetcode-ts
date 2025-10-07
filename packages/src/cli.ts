#!/usr/bin/env tsx
import { Command } from 'commander';
import { newProblem } from './new-problem.js';
import { buildData } from './build-data.js';

const program = new Command();

program
  .name('leetcode-cli')
  .description('CLI tools for LeetCode TypeScript solutions')
  .version('1.0.0');

program
  .command('new')
  .description('Create a new problem file')
  .option('-i, --id <number>', 'Problem ID')
  .option('-s, --slug <string>', 'Problem slug')
  .option('-t, --title <string>', 'Problem title')
  .option('-d, --difficulty <string>', 'Problem difficulty', 'easy')
  .option('--tags <string>', 'Comma-separated tags')
  .option('--from-leetcode', 'Fetch problem data from LeetCode website')
  .option('--leetcode-slug <string>', 'LeetCode problem slug (e.g., two-sum)')
  .action(async (options) => {
    await newProblem(options);
  });

program
  .command('build-data')
  .description('Build data for the website')
  .option('-w, --watch', 'Watch for changes')
  .action(async (options) => {
    await buildData(options);
  });

program.parse();
