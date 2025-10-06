import { z } from 'zod';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ProblemMeta {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  difficulty: Difficulty;
  description?: string;
  constraints?: string[];
}

export interface TestCase<I, O> {
  name?: string;
  input: I;
  expected: O;
  only?: boolean;
  skip?: boolean;
}

export interface TestResult<I, O> extends TestCase<I, O> {
  actual: O;
  passed: boolean;
  duration: number;
  error?: string;
}

export interface ProblemData extends ProblemMeta {
  code: string;
  notes: string;
  testResults: TestResult<any, any>[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

export interface IndexData {
  problems: ProblemMeta[];
  totalProblems: number;
  difficultyCounts: Record<Difficulty, number>;
  tagCounts: Record<string, number>;
}

// Zod schemas for validation
export const difficultySchema = z.enum(['easy', 'medium', 'hard']);

export const problemMetaSchema = z.object({
  id: z.number().positive(),
  slug: z.string().min(1),
  title: z.string().min(1),
  tags: z.array(z.string()),
  difficulty: difficultySchema,
  description: z.string().optional(),
  constraints: z.array(z.string()).optional(),
});

export const testCaseSchema = z.object({
  name: z.string().optional(),
  input: z.any(),
  expected: z.any(),
  only: z.boolean().optional(),
  skip: z.boolean().optional(),
});
