import { createSignal } from 'solid-js';

interface ProblemMeta {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  difficulty: string;
}

interface ProblemListProps {
  problems: ProblemMeta[];
}

export default function ProblemList(props: ProblemListProps) {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [difficultyFilter, setDifficultyFilter] = createSignal<string>('all');
  const [tagFilter, setTagFilter] = createSignal<string>('all');

  // Get unique tags
  const allTags = () =>
    Array.from(new Set(props.problems.flatMap((p) => p.tags))).sort();

  // Filter problems
  const filteredProblems = () =>
    props.problems.filter((problem) => {
      const search = searchTerm().toLowerCase();
      const difficulty = difficultyFilter();
      const tag = tagFilter();

      const matchesSearch =
        problem.title.toLowerCase().includes(search) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(search));
      const matchesDifficulty =
        difficulty === 'all' || problem.difficulty === difficulty;
      const matchesTag = tag === 'all' || problem.tags.includes(tag);

      return matchesSearch && matchesDifficulty && matchesTag;
    });

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

  return (
    <div>
      {/* Filters */}
      <div class="mb-6 space-y-4">
        <div class="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm()}
            onInput={(e) => setSearchTerm(e.currentTarget.value)}
            class="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={difficultyFilter()}
            onChange={(e) => setDifficultyFilter(e.currentTarget.value)}
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            value={tagFilter()}
            onChange={(e) => setTagFilter(e.currentTarget.value)}
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Tags</option>
            {allTags().map((tag) => (
              <option value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problem List */}
      <div class="space-y-4">
        {filteredProblems().map((problem) => (
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <span class="text-sm font-mono text-gray-500">
                    {problem.id.toString().padStart(4, '0')}
                  </span>
                  <span
                    class={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  <a
                    href={`/leetcode-ts/problem/${problem.slug}`}
                    class="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {problem.title}
                  </a>
                </h3>

                <div class="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div class="ml-4">
                <a
                  href={`/leetcode-ts/problem/${problem.slug}?tab=solutions`}
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  View Solution
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProblems().length === 0 && (
        <div class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">
            No problems found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
