export interface LeetCodeProblem {
  questionId: string;
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  content: string;
  exampleTestcases: string;
  metaData: string;
  hints: string[];
  similarQuestions: string;
  contributors: any[];
  topicTags: Array<{
    name: string;
    slug: string;
    translatedName?: string;
  }>;
  companyTagStats: any;
  codeSnippets: Array<{
    lang: string;
    langSlug: string;
    code: string;
  }>;
  stats: string;
  acRate: number;
  likes: number;
  dislikes: number;
  isLiked: boolean | null;
  isPaidOnly: boolean;
  solution: any;
  hasSolution: boolean;
  hasVideoSolution: boolean;
  status: string | null;
  sampleTestCase: string;
  enableRunCode: boolean;
  enableTestMode: boolean;
  enableDebugger: boolean;
  envInfo: string;
  libraryUrl: string | null;
  adminUrl: string;
  challengeQuestion: any;
  __typename: string;
}

export interface LeetCodeResponse {
  data: {
    question: LeetCodeProblem;
  };
}

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql/';

const PROBLEM_QUERY = `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        topicTags {
          name
          id
          slug
        }
        hasSolution
        hasVideoSolution
      }
    }
  }
`;

const SINGLE_PROBLEM_QUERY = `
  query questionContent($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      content
      mysqlSchemas
      dataSchemas
    }
  }
`;

const PROBLEM_DETAILS_QUERY = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      questionFrontendId
      title
      titleSlug
      difficulty
      likes
      dislikes
      isLiked
      similarQuestions
      contributors {
        username
        profileUrl
        avatarUrl
        __typename
      }
      topicTags {
        name
        slug
        translatedName
        __typename
      }
      companyTagStats
      codeSnippets {
        lang
        langSlug
        code
        __typename
      }
      stats
      hints
      solution {
        id
        canSeeDetail
        paidOnly
        hasVideoSolution
        paidOnlyVideo
        __typename
      }
      status
      sampleTestCase
      metaData
      judgerAvailable
      judgeType
      mysqlSchemas
      enableRunCode
      enableTestMode
      enableDebugger
      envInfo
      libraryUrl
      adminUrl
      challengeQuestion {
        id
        date
        incompleteChallengeCount
        streakCount
        type
        __typename
      }
      __typename
    }
  }
`;

export interface ProblemContent {
  description: string;
  constraints?: string[];
  followUp?: string[];
  examples?: Array<{ input: string; output: string; explanation?: string }>;
}

export class LeetCodeScraper {
  private async makeRequest(query: string, variables: any = {}): Promise<any> {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data;
  }

  async getProblemBySlug(slug: string): Promise<LeetCodeProblem> {
    const data = await this.makeRequest(PROBLEM_DETAILS_QUERY, {
      titleSlug: slug,
    });
    return data.data.question;
  }

  async getProblemContent(slug: string): Promise<{
    content: string;
    mysqlSchemas: string[];
    dataSchemas: string[];
  }> {
    const data = await this.makeRequest(SINGLE_PROBLEM_QUERY, {
      titleSlug: slug,
    });
    return data.data.question;
  }

  async searchProblems(
    searchTerm: string,
    limit: number = 10
  ): Promise<LeetCodeProblem[]> {
    const data = await this.makeRequest(PROBLEM_QUERY, {
      categorySlug: '',
      skip: 0,
      limit,
      filters: {
        searchKeywords: searchTerm,
      },
    });
    return data.data.problemsetQuestionList.questions;
  }

  parseProblemContent(content: string): ProblemContent {
    // Remove HTML tags and clean up the content
    const cleanContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .trim();

    // Extract constraints
    const constraintsMatch = cleanContent.match(
      /Constraints?:?\s*([\s\S]*?)(?=Follow-up|Example|$)/i
    );
    const constraints = constraintsMatch
      ? constraintsMatch[1]
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
      : [];

    // Extract follow-up questions
    const followUpMatch = cleanContent.match(
      /Follow-up:?\s*([\s\S]*?)(?=Example|$)/i
    );
    const followUp = followUpMatch
      ? followUpMatch[1]
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
      : [];

    // Extract examples
    const examples: Array<{
      input: string;
      output: string;
      explanation?: string;
    }> = [];
    const exampleRegex =
      /Example \d+:\s*Input:\s*([^\n]+?)\s*Output:\s*([^\n]+?)(?:\s*Explanation:\s*([^\n]+?))?(?=Example|\n\n|$)/gis;
    let match;
    while ((match = exampleRegex.exec(cleanContent)) !== null) {
      examples.push({
        input: match[1].trim(),
        output: match[2].trim(),
        explanation: match[3]?.trim(),
      });
    }

    // Extract main description (everything before constraints)
    const descriptionMatch = cleanContent.match(/([\s\S]*?)(?=Constraints?:)/i);
    const description = descriptionMatch
      ? descriptionMatch[1].trim()
      : cleanContent;

    return {
      description,
      constraints,
      followUp,
      examples,
    };
  }

  generateInputSchema(
    metaData: string,
    examples: Array<{ input: string; output: string }>
  ): string {
    try {
      // Parse the metadata JSON
      const parsed = JSON.parse(metaData);
      const params = parsed.params || [];

      if (params.length === 0) {
        // Fallback: try to infer from examples
        if (examples.length > 0) {
          const firstExample = examples[0];
          try {
            const inputObj = JSON.parse(firstExample.input);
            return this.generateSchemaFromObject(inputObj);
          } catch {
            // If parsing fails, return a basic schema
            return `z.object({
  // Define your input schema here based on the problem description
});`;
          }
        }
        return `z.object({
  // Define your input schema here
});`;
      }

      // For LeetCode-style function signatures, generate individual parameters
      if (params.length === 1) {
        const param = params[0];
        const fieldType = this.mapLeetCodeTypeToZod(param.type);
        return `z.object({
  ${param.name}: ${fieldType},
})`;
      } else {
        // Multiple parameters - create object with all parameters
        const schemaFields = params
          .map((param: any) => {
            const fieldName = param.name;
            const fieldType = this.mapLeetCodeTypeToZod(param.type);
            return `  ${fieldName}: ${fieldType},`;
          })
          .join('\n');

        return `z.object({
${schemaFields}
})`;
      }
    } catch (error) {
      console.warn('Failed to parse metadata, using fallback schema');
      return `z.object({
  // Define your input schema here
});`;
    }
  }

  private mapLeetCodeTypeToZod(type: string): string {
    const typeMap: Record<string, string> = {
      'integer[]': 'z.array(z.number())',
      'string[]': 'z.array(z.string())',
      integer: 'z.number()',
      string: 'z.string()',
      boolean: 'z.boolean()',
      character: 'z.string().length(1)',
      'character[]': 'z.array(z.string().length(1))',
      ListNode: 'z.any()', // Custom type for linked lists
      TreeNode: 'z.any()', // Custom type for binary trees
    };

    // Handle array types
    if (type.includes('[]')) {
      const baseType = type.replace('[]', '');
      const zodType = typeMap[baseType] || 'z.any()';
      return `z.array(${zodType})`;
    }

    // Handle nested arrays
    if (type.includes('[][]')) {
      const baseType = type.replace('[][]', '');
      const zodType = typeMap[baseType] || 'z.any()';
      return `z.array(z.array(${zodType}))`;
    }

    return typeMap[type] || 'z.any()';
  }

  private generateSchemaFromObject(obj: any): string {
    if (Array.isArray(obj)) {
      if (obj.length === 0) return 'z.array(z.any())';
      const elementType = this.generateSchemaFromObject(obj[0]);
      return `z.array(${elementType})`;
    }

    if (typeof obj === 'object' && obj !== null) {
      const fields = Object.entries(obj)
        .map(([key, value]) => {
          const fieldType = this.generateSchemaFromObject(value);
          return `  ${key}: ${fieldType},`;
        })
        .join('\n');
      return `z.object({\n${fields}\n})`;
    }

    const typeMap: Record<string, string> = {
      number: 'z.number()',
      string: 'z.string()',
      boolean: 'z.boolean()',
    };

    return typeMap[typeof obj] || 'z.any()';
  }

  mapDifficulty(leetcodeDifficulty: string): 'easy' | 'medium' | 'hard' {
    switch (leetcodeDifficulty.toLowerCase()) {
      case 'easy':
        return 'easy';
      case 'medium':
        return 'medium';
      case 'hard':
        return 'hard';
      default:
        return 'easy';
    }
  }

  generateProblemFileContent(
    problem: LeetCodeProblem,
    content: ProblemContent
  ): string {
    const id = parseInt(problem.questionFrontendId);
    const slug = problem.titleSlug;
    const title = problem.title;
    const difficulty = this.mapDifficulty(problem.difficulty);
    const tags = problem.topicTags.map((tag) => `'${tag.slug}'`).join(', ');

    // Generate input schema
    const inputSchema = this.generateInputSchema(
      problem.metaData,
      content.examples ?? []
    );

    // Generate output type (simplified - would need more sophisticated parsing)
    const outputType = this.inferOutputType(content.examples ?? []);

    // Generate empty test cases - user will add them manually
    const testCases = `  // Add your test cases here
  // { input: [/* your input values */], expected: /* expected output */, name: 'Example 1' },`;

    return `/**
 * ${id.toString().padStart(4, '0')}. ${title}
 *
 * Difficulty: ${difficulty}
 * Tags: ${problem.topicTags.map((tag) => tag.slug).join(', ')}
 *
 * Description:
${content.description
  .split('\n')
  .map((line) => ` * ${line}`)
  .join('\n')}
 *
 * Constraints:
${content.constraints?.map((constraint) => ` * - ${constraint}`).join('\n')}
${(content.followUp?.length ?? 0 > 0) ? ` *\n * Follow-up:\n${content.followUp!.map((followUp) => ` * - ${followUp}`).join('\n')}` : ''}
 */
import { z } from 'zod';
import type { TestCase } from '../packages/src/types.js';

export const SolutionSchema = z.function({
  input: [${this.generateZodInputTypes(problem.metaData)}],
  output: ${this.generateZodOutputType(content.examples ?? [])}
});

export type Solution = z.infer<typeof SolutionSchema>;

export const cases: TestCase<Solution>[] = [
${testCases}
];

/**
 * Solution
 * Approach: 
 *   - Add your approach here
 * Time Complexity: O()
 * Space Complexity: O()
 */
export const solution = SolutionSchema.implement((${this.generateFunctionParams(problem.metaData)}) => {
  // Your solution here
  throw new Error('Not implemented');
});

export const solutions = [solution];
`;
  }

  private inferOutputType(
    examples: Array<{ output: string }> | undefined
  ): string {
    if (examples?.length === 0) return 'any';

    try {
      const firstOutput = JSON.parse(examples![0].output);

      if (Array.isArray(firstOutput)) {
        if (firstOutput.length === 0) return 'any[]';
        if (typeof firstOutput[0] === 'number') return 'number[]';
        if (typeof firstOutput[0] === 'string') return 'string[]';
        if (typeof firstOutput[0] === 'boolean') return 'boolean[]';
        return 'any[]';
      }

      if (typeof firstOutput === 'number') return 'number';
      if (typeof firstOutput === 'string') return 'string';
      if (typeof firstOutput === 'boolean') return 'boolean';

      return 'any';
    } catch {
      return 'any';
    }
  }

  private generateZodInputTypes(metaData: string): string {
    try {
      const parsed = JSON.parse(metaData);
      const params = parsed.params || [];

      if (params.length === 0) {
        return 'z.any()';
      }

      return params
        .map((param: any) => {
          const fieldType = this.mapLeetCodeTypeToZod(param.type);
          return fieldType;
        })
        .join(', ');
    } catch (error) {
      return 'z.any()';
    }
  }

  private generateZodOutputType(
    examples: Array<{ output: string }> | undefined
  ): string {
    if (examples?.length === 0) return 'z.any()';

    try {
      const firstOutput = JSON.parse(examples![0].output);

      if (Array.isArray(firstOutput)) {
        if (firstOutput.length === 0) return 'z.array(z.any())';
        if (typeof firstOutput[0] === 'number') return 'z.array(z.number())';
        if (typeof firstOutput[0] === 'string') return 'z.array(z.string())';
        if (typeof firstOutput[0] === 'boolean') return 'z.array(z.boolean())';
        return 'z.array(z.any())';
      }

      if (typeof firstOutput === 'number') return 'z.number()';
      if (typeof firstOutput === 'string') return 'z.string()';
      if (typeof firstOutput === 'boolean') return 'z.boolean()';

      return 'z.any()';
    } catch {
      return 'z.any()';
    }
  }

  private generateFunctionParams(metaData: string): string {
    try {
      const parsed = JSON.parse(metaData);
      const params = parsed.params || [];

      if (params.length === 0) {
        return 'input';
      }

      return params.map((param: any) => param.name).join(', ');
    } catch (error) {
      return 'input';
    }
  }
}
