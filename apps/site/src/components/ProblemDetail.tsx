import { createSignal } from 'solid-js';

interface Solution {
  name: string;
  description: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  testResults: Array<{
    input: any;
    expected: any;
    name: string;
    actual?: any;
    passed: boolean;
    duration: number;
    error?: string;
  }>;
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

interface ProblemData {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  difficulty: string;
  solutions: Solution[];
  notes: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

interface ProblemDetailProps {
  problem: ProblemData;
}

export default function ProblemDetail(props: ProblemDetailProps) {
  const [activeTab, setActiveTab] = createSignal<
    'notes' | 'solutions' | 'tests'
  >('notes');
  const [activeSolution, setActiveSolution] = createSignal(0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTestStatusColor = (passed: boolean) => {
    return passed ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  return (
    <div>
      {/* Header */}
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-4">
          <span class="text-sm font-mono text-gray-500">
            {props.problem.id.toString().padStart(4, '0')}
          </span>
          <span
            class={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(props.problem.difficulty)}`}
          >
            {props.problem.difficulty}
          </span>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {props.problem.title}
        </h1>

        <div class="flex flex-wrap gap-2 mb-4">
          {props.problem.tags.map((tag) => (
            <span class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Test Results Summary */}
        <div class="flex items-center space-x-6 text-sm">
          <div class="flex items-center space-x-2">
            <span class="text-gray-600 dark:text-gray-400">Tests:</span>
            <span class="font-semibold">
              {props.problem.passedTests}/{props.problem.totalTests}
            </span>
            <span
              class={`px-2 py-1 text-xs rounded-full ${getTestStatusColor(props.problem.passedTests === props.problem.totalTests)}`}
            >
              {props.problem.passedTests === props.problem.totalTests
                ? 'PASSED'
                : 'FAILED'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav class="-mb-px flex space-x-8">
          {[
            { id: 'notes', label: 'Notes' },
            { id: 'solutions', label: 'Solutions' },
            { id: 'tests', label: 'Tests' },
          ].map((tab) => (
            <button
              onClick={() => setActiveTab(tab.id as any)}
              class={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab() === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div class="space-y-6">
        {activeTab() === 'notes' && (
          <div class="prose dark:prose-invert max-w-none">
            <div innerHTML={props.problem.notes} />
          </div>
        )}

        {activeTab() === 'solutions' && (
          <div class="space-y-6">
            {/* Solution Selector */}
            <div class="flex space-x-2">
              {props.problem.solutions.map((solution, index) => (
                <button
                  onClick={() => setActiveSolution(index)}
                  class={`px-4 py-2 text-sm font-medium rounded-lg ${
                    activeSolution() === index
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {solution.name}
                </button>
              ))}
            </div>

            {/* Active Solution */}
            {props.problem.solutions[activeSolution()] && (
              <div class="space-y-4">
                {/* Solution Info */}
                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {props.problem.solutions[activeSolution()].name}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 mb-3">
                    {props.problem.solutions[activeSolution()].description}
                  </p>

                  {/* Approach */}
                  <div class="mb-3">
                    <h4 class="font-medium text-gray-900 dark:text-white mb-1">
                      Approach:
                    </h4>
                    <div class="prose dark:prose-invert text-sm">
                      <div
                        innerHTML={props.problem.solutions[
                          activeSolution()
                        ].approach.replace(/\n/g, '<br>')}
                      />
                    </div>
                  </div>

                  {/* Complexity */}
                  <div class="flex space-x-4 text-sm">
                    <div>
                      <span class="font-medium text-gray-900 dark:text-white">
                        Time:
                      </span>
                      <span class="text-gray-600 dark:text-gray-400 ml-1">
                        {
                          props.problem.solutions[activeSolution()]
                            .timeComplexity
                        }
                      </span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-900 dark:text-white">
                        Space:
                      </span>
                      <span class="text-gray-600 dark:text-gray-400 ml-1">
                        {
                          props.problem.solutions[activeSolution()]
                            .spaceComplexity
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Code */}
                <div class="bg-gray-900 rounded-lg overflow-hidden">
                  <div class="px-4 py-2 bg-gray-800 text-gray-300 text-sm">
                    TypeScript
                  </div>
                  <div
                    class="p-4 overflow-x-auto"
                    innerHTML={props.problem.solutions[activeSolution()].code}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab() === 'tests' && (
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Test Cases
              </h3>
              <div class="flex space-x-2">
                {props.problem.solutions.map((solution, index) => (
                  <button
                    onClick={() => setActiveSolution(index)}
                    class={`px-3 py-1 text-sm rounded ${
                      activeSolution() === index
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {solution.name}
                  </button>
                ))}
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Input
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Expected
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actual
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {props.problem.solutions[activeSolution()]?.testResults.map(
                    (test) => (
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                          {JSON.stringify(test.input)}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                          {JSON.stringify(test.expected)}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                          {test.error ? (
                            <span class="text-red-600">{test.error}</span>
                          ) : (
                            JSON.stringify(test.actual)
                          )}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            class={`px-2 py-1 text-xs font-semibold rounded-full ${getTestStatusColor(test.passed)}`}
                          >
                            {test.passed ? 'PASS' : 'FAIL'}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {test.duration.toFixed(2)}ms
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
