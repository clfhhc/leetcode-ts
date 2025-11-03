import { default as TurndownService } from 'turndown';

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
  private turndownService: TurndownService;

  constructor() {
    this.turndownService = new TurndownService({
      hr: '',
      bulletListMarker: '-',
    });

    // Preserve mathematical superscripts/subscripts from HTML into markdown-ish text
    // e.g., 2<sup>31</sup> -> 2^31, H<sub>2</sub>O -> H_2O
    this.turndownService.addRule('sup', {
      filter: 'sup',
      replacement: (content) => `^${content}`,
    });
    this.turndownService.addRule('sub', {
      filter: 'sub',
      replacement: (content) => `_${content}`,
    });
  }

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

  private cleanMarkdown(content: string): string {
    return content
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace 3+ consecutive newlines with 2
      .replace(/^\s*\n/g, '') // Remove leading empty lines
      .replace(/\n\s*$/g, '') // Remove trailing empty lines
      .trim();
  }

  parseProblemContent(content: string): ProblemContent {
    // Convert HTML to markdown first
    const markdownContent = this.turndownService.turndown(content);

    // Remove remaining HTML tags and clean up the content
    const cleanContent = this.cleanMarkdown(markdownContent);

    // Extract constraints
    // Use section-header lookaheads so we don't prematurely stop at a plain word "example" in the description
    const constraintsMatch = cleanContent.match(
      /\*{0,3}Constraints?:?\*{0,2}\s*([\s\S]*?)(?=^\s*\*{0,2}Follow-up:|^\s*\*{0,2}Example\s*\d+:|(?![\s\S]))/im
    );
    const constraints = constraintsMatch
      ? Array.from(constraintsMatch[1].matchAll(/^\s*[-*]\s+(.+?)\s*$/gm)).map(
          (m) => m[1].trim()
        )
      : [];

    // Extract follow-up questions
    const followUpMatch = cleanContent.match(
      /\*{0,2}Follow-up:?\*{0,2}\s*([\s\S]*?)(?=^\s*\*{0,2}Example\s*\d+:|(?![\s\S]))/im
    );
    const followUp = followUpMatch
      ? followUpMatch[1]
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => {
            // Remove extra dashes and clean up markdown formatting
            return line
              .replace(/^-\s*/, '')
              .replace(/^\*\*\s*/, '')
              .replace(/\*\*$/, '');
          })
          .filter((line) => line.length > 0) // Filter out empty lines after cleaning
      : [];

    // Extract examples
    const examples: Array<{
      input: string;
      output: string;
      explanation?: string;
    }> = [];
    const exampleRegex =
      /\*{0,2}Example \d+:\*{0,2}\s*\n?\*{0,2}Input:\*{0,2}\s*([^\n]+?)\s*\n?\*{0,2}Output:\*{0,2}\s*([^\n]+?)(?:\s*\n?\*{0,2}Explanation:\*{0,2}\s*([^\n]+?))?(?=\*{0,2}Example|\n\n|$)/gis;
    let match;
    while ((match = exampleRegex.exec(cleanContent)) !== null) {
      examples.push({
        input: match[1].trim(),
        output: match[2].trim(),
        explanation: match[3]?.trim(),
      });
    }

    // Extract main description (everything before constraints, examples, or follow-up)
    // Anchor Example/Follow-up to section headers so inline uses of the word "example" don't truncate the description
    const descriptionMatch = cleanContent.match(
      /([\s\S]*?)(?=^\s*\*{0,2}Constraints?:|^\s*\*{0,2}Example\s*\d+:|^\s*\*{0,2}Follow-up)/im
    );
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
    const title = problem.title;
    const difficulty = this.mapDifficulty(problem.difficulty);

    // Generate empty test cases - user will add them manually
    const testCases = `  // Add your test cases here
  // { input: [/* your input values */], expected: /* expected output */, name: 'Example 1' },`;

    // Clean up description formatting - preserve structure
    const cleanedDescription = content.description;

    // Format examples section with proper indentation
    const examplesSection =
      (content.examples?.length ?? 0 > 0)
        ? ` *
 * Examples:
${content
  .examples!.map(
    (example, index) =>
      ` * ${index + 1}. Input: ${example.input}
 *    Output: ${example.output}${example.explanation ? `\n *    Explanation: ${example.explanation}` : ''}`
  )
  .join('\n')}`
        : ' *';

    const constraintsSection =
      (content.constraints?.length ?? 0 > 0)
        ? ` *
 * Constraints:
${content.constraints!.map((constraint) => ` * - ${constraint}`).join('\n')}`
        : ' *';

    const followUpSection =
      (content.followUp?.length ?? 0 > 0)
        ? ` *
 * Follow-up:
${content.followUp!.map((followUp) => ` * - ${followUp}`).join('\n')}`
        : ' *';

    return `/**
 * ${id.toString().padStart(4, '0')}. ${title}
 *
 * Difficulty: ${difficulty}
 * Tags: ${problem.topicTags.map((tag) => tag.slug).join(', ')}
 *
 * Description:
${cleanedDescription
  .split('\n')
  .map((line) => ` * ${line}`)
  .join('\n')}
${examplesSection}
${constraintsSection}
${followUpSection}
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
    } catch {
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
    } catch {
      return 'input';
    }
  }
}
