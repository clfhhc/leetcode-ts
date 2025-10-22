#!/usr/bin/env tsx
import { Command } from 'commander';
import { spawn } from 'child_process';
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

program
  .command('build-site')
  .description('Build the Astro site')
  .action(async () => {
    console.log('Building Astro site...');
    const child = spawn('pnpm', ['-C', 'apps/site', 'build'], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Site built successfully');
      } else {
        console.error(`❌ Site build failed with code ${code}`);
        process.exit(code || 1);
      }
    });
  });

program
  .command('build')
  .description('Build both data and site')
  .action(async () => {
    console.log('Building data and site...');
    try {
      await buildData({});
      console.log('✅ Data built successfully');

      console.log('Building site...');
      const child = spawn('pnpm', ['-C', 'apps/site', 'build'], {
        stdio: 'inherit',
        shell: true
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Build completed successfully');
        } else {
          console.error(`❌ Build failed with code ${code}`);
          process.exit(code || 1);
        }
      });
    } catch (error) {
      console.error('❌ Error during build:', error);
      process.exit(1);
    }
  });

program
  .command('dev')
  .description('Start development mode with data watching and site dev server')
  .action(async () => {
    console.log('Starting development mode...');

    // Start data watcher
    console.log('Starting data watcher...');
    const dataWatcher = spawn('tsx', ['packages/src/build-data.ts', '--watch'], {
      stdio: 'pipe',
      shell: true
    });

    // Start site dev server
    console.log('Starting site dev server...');
    const siteDev = spawn('pnpm', ['-C', 'apps/site', 'dev', '--open'], {
      stdio: 'inherit',
      shell: true
    });

    // Handle cleanup on exit
    const cleanup = () => {
      dataWatcher.kill();
      siteDev.kill();
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    dataWatcher.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Data watcher failed with code ${code}`);
        cleanup();
        process.exit(code || 1);
      }
    });
  });

program.parse();
