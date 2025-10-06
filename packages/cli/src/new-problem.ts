import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { prompt } from 'inquirer';
import chalk from 'chalk';

export interface NewProblemOptions {
  id?: string;
  slug?: string;
  title?: string;
  difficulty?: string;
  tags?: string;
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
import type { ProblemMeta, TestCase } from '@types';

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

  // Prompt for missing required fields
  if (!id) {
    const { inputId } = await prompt([{
      type: 'input',
      name: 'inputId',
      message: 'Problem ID:',
      validate: (input) => {
        const num = parseInt(input);
        return !isNaN(num) && num > 0 ? true : 'Please enter a valid positive number';
      }
    }]);
    id = inputId;
  }

  if (!slug) {
    const { inputSlug } = await prompt([{
      type: 'input',
      name: 'inputSlug',
      message: 'Problem slug (kebab-case):',
      validate: (input) => {
        return /^[a-z0-9-]+$/.test(input) ? true : 'Please enter a valid slug (lowercase, numbers, hyphens only)';
      }
    }]);
    slug = inputSlug;
  }

  if (!title) {
    const { inputTitle } = await prompt([{
      type: 'input',
      name: 'inputTitle',
      message: 'Problem title:',
    }]);
    title = inputTitle;
  }

  if (!difficulty) {
    const { inputDifficulty } = await prompt([{
      type: 'list',
      name: 'inputDifficulty',
      message: 'Difficulty:',
      choices: ['easy', 'medium', 'hard'],
    }]);
    difficulty = inputDifficulty;
  }

  if (!tags) {
    const { inputTags } = await prompt([{
      type: 'input',
      name: 'inputTags',
      message: 'Tags (comma-separated):',
    }]);
    tags = inputTags;
  }

  // Format tags
  const tagList = tags.split(',').map(tag => `'${tag.trim()}'`).join(', ');

  // Generate filename
  const paddedId = id.padStart(4, '0');
  const filename = `${paddedId}-${slug}.ts`;
  const filepath = join(process.cwd(), 'problems', filename);

  // Check if file already exists
  if (existsSync(filepath)) {
    console.log(chalk.red(`File ${filename} already exists!`));
    return;
  }

  // Generate content
  const content = PROBLEM_TEMPLATE
    .replace(/{id}/g, id)
    .replace(/{slug}/g, slug)
    .replace(/{title}/g, title)
    .replace(/{difficulty}/g, difficulty)
    .replace(/{tags}/g, tagList)
    .replace(/{description}/g, 'Add problem description here')
    .replace(/{approach}/g, 'Add your approach here');

  // Write file
  writeFileSync(filepath, content);

  console.log(chalk.green(`✅ Created problem file: ${filename}`));
  console.log(chalk.blue(`📝 Edit the file to add your solution and test cases`));
}
