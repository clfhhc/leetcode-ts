import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { LeetCodeScraper } from './leetcode-scraper.js';

export interface NewProblemOptions {
  id?: string;
  slug?: string;
  title?: string;
  difficulty?: string;
  tags?: string;
  fromLeetcode?: boolean;
  leetcodeSlug?: string;
}

const PROBLEM_TEMPLATE = `/**
 * {id}. {title}
 *
 * Difficulty: {difficulty}
 * Tags: {tags}
 *
 * Description:
 * {description}
 *
 * Approach:
 * - {approach}
 *
 * Time Complexity: O()
 * Space Complexity: O()
 */
import { z } from 'zod';
import type { ProblemMeta, TestCase } from '../packages/src/types.js';

export const meta: ProblemMeta = {
  id: {id},
  slug: '{slug}',
  title: '{title}',
  tags: [{tags}],
  difficulty: '{difficulty}',
};

export const inputSchema = z.object({
  // Define your input schema here
});

export type Input = z.infer<typeof inputSchema>;
export type Output = any; // Define your output type

export function solve(input: Input): Output {
  // Your solution here
  throw new Error('Not implemented');
}

export const cases: TestCase<Input, Output>[] = [
  // Add your test cases here
  // { input: { }, expected: , name: 'Example 1' },
];
`;

export async function newProblem(options: NewProblemOptions) {
  console.log(chalk.blue('Creating new LeetCode problem...'));

  let { id, slug, title, difficulty, tags } = options;
  let fromLeetCode = options.fromLeetcode;
  let leetCodeSlug = options.leetcodeSlug;

  // If fetching from LeetCode, get the data first
  if (fromLeetCode) {
    const scraper = new LeetCodeScraper();
    
    try {
      console.log(chalk.yellow('Fetching problem data from LeetCode...'));
      
      // Get LeetCode slug if not provided
      if (!leetCodeSlug) {
        const { inputSlug } = await inquirer.prompt([{
          type: 'input',
          name: 'inputSlug',
          message: 'LeetCode problem slug (e.g., two-sum):',
          validate: (input: string) => input.trim().length > 0 ? true : 'Please enter a valid slug'
        }]);
        leetCodeSlug = inputSlug;
      }

      // Fetch problem data
      const [problemData, problemContent] = await Promise.all([
        scraper.getProblemBySlug(leetCodeSlug!),
        scraper.getProblemContent(leetCodeSlug!)
      ]);

      // Parse content
      const parsedContent = scraper.parseProblemContent(problemContent.content);
      
      // Generate the complete file content
      const fileContent = scraper.generateProblemFileContent(problemData, parsedContent);
      
      // Generate filename
      const paddedId = problemData.questionFrontendId.padStart(4, '0');
      const filename = `${paddedId}-${problemData.titleSlug}.ts`;
      const filepath = join(process.cwd(), 'problems', filename);

      // Check if file already exists
      if (existsSync(filepath)) {
        console.log(chalk.red(`File ${filename} already exists!`));
        return;
      }

      // Write file
      writeFileSync(filepath, fileContent);

      console.log(chalk.green(`✅ Created problem file: ${filename}`));
      console.log(chalk.blue(`📝 Problem: ${problemData.title}`));
      console.log(chalk.blue(`🎯 Difficulty: ${problemData.difficulty}`));
      console.log(chalk.blue(`🏷️  Tags: ${problemData.topicTags.map(tag => tag.slug).join(', ')}`));
      console.log(chalk.yellow(`⚠️  Review and update the solution function and test cases as needed`));
      
      return;
    } catch (error) {
      console.error(chalk.red(`❌ Error fetching from LeetCode: ${error}`));
      console.log(chalk.yellow('Falling back to manual input...'));
    }
  }

  // Prompt for missing required fields
  if (!id) {
    const { inputId } = await inquirer.prompt([{
      type: 'input',
      name: 'inputId',
      message: 'Problem ID:',
      validate: (input: string) => {
        const num = parseInt(input);
        return !isNaN(num) && num > 0 ? true : 'Please enter a valid positive number';
      }
    }]);
    id = inputId;
  }

  if (!slug) {
    const { inputSlug } = await inquirer.prompt([{
      type: 'input',
      name: 'inputSlug',
      message: 'Problem slug (kebab-case):',
      validate: (input: string) => {
        return /^[a-z0-9-]+$/.test(input) ? true : 'Please enter a valid slug (lowercase, numbers, hyphens only)';
      }
    }]);
    slug = inputSlug;
  }

  if (!title) {
    const { inputTitle } = await inquirer.prompt([{
      type: 'input',
      name: 'inputTitle',
      message: 'Problem title:',
    }]);
    title = inputTitle;
  }

  if (!difficulty) {
    const { inputDifficulty } = await inquirer.prompt([{
      type: 'list',
      name: 'inputDifficulty',
      message: 'Difficulty:',
      choices: ['easy', 'medium', 'hard'],
    }]);
    difficulty = inputDifficulty;
  }

  if (!tags) {
    const { inputTags } = await inquirer.prompt([{
      type: 'input',
      name: 'inputTags',
      message: 'Tags (comma-separated):',
    }]);
    tags = inputTags;
  }

  // Format tags
  const tagList = tags?.split(',').map(tag => `'${tag.trim()}'`).join(', ') || '';

  // Generate filename
  const paddedId = id?.padStart(4, '0') || '0000';
  const filename = `${paddedId}-${slug}.ts`;
  const filepath = join(process.cwd(), 'problems', filename);

  // Check if file already exists
  if (existsSync(filepath)) {
    console.log(chalk.red(`File ${filename} already exists!`));
    return;
  }

  // Generate content
  const content = PROBLEM_TEMPLATE
    .replace(/{id}/g, id || '0')
    .replace(/{slug}/g, slug || '')
    .replace(/{title}/g, title || '')
    .replace(/{difficulty}/g, difficulty || 'easy')
    .replace(/{tags}/g, tagList)
    .replace(/{description}/g, 'Add problem description here')
    .replace(/{approach}/g, 'Add your approach here');

  // Write file
  writeFileSync(filepath, content);

  console.log(chalk.green(`✅ Created problem file: ${filename}`));
  console.log(chalk.blue(`📝 Edit the file to add your solution and test cases`));
}
