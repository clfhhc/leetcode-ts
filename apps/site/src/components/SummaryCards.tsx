import { createSignal, createEffect } from 'solid-js';

interface SummaryCardsProps {
  totalProblems: number;
  difficultyCounts: {
    easy: number;
    medium: number;
    hard: number;
  };
  onDifficultyFilterChange: (filter: string) => void;
  currentFilter?: string;
}

export default function SummaryCards(props: SummaryCardsProps) {
  const [activeFilter, setActiveFilter] = createSignal<string>(props.currentFilter || 'all');

  // Sync with external filter changes (from dropdown)
  createEffect(() => {
    if (props.currentFilter !== undefined) {
      setActiveFilter(props.currentFilter);
    }
  });

  const handleCardClick = (filter: string) => {
    // If clicking on "total", always reset to 'all'
    if (filter === 'total') {
      setActiveFilter('all');
      props.onDifficultyFilterChange('all');
      return;
    }
    
    // Toggle behavior: if already active, reset to 'all'; otherwise set to filter
    const newFilter = activeFilter() === filter ? 'all' : filter;
    setActiveFilter(newFilter);
    props.onDifficultyFilterChange(newFilter);
  };

  const getCardClasses = (filter: string) => {
    const baseClasses = 'cursor-pointer transition-all hover:shadow-lg';
    const currentFilter = activeFilter();
    
    if (filter === 'total') {
      // Total card is active when filter is 'all'
      const isActive = currentFilter === 'all';
      return `${baseClasses} ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''}`;
    }
    if (filter === 'easy') {
      const isActive = currentFilter === 'easy';
      return `${baseClasses} ${isActive ? 'ring-2 ring-green-500 shadow-lg' : ''}`;
    }
    if (filter === 'medium') {
      const isActive = currentFilter === 'medium';
      return `${baseClasses} ${isActive ? 'ring-2 ring-yellow-500 shadow-lg' : ''}`;
    }
    if (filter === 'hard') {
      const isActive = currentFilter === 'hard';
      return `${baseClasses} ${isActive ? 'ring-2 ring-red-500 shadow-lg' : ''}`;
    }
    return baseClasses;
  };

  return (
    <div class="mb-8">
      {/* Mobile: Single card with rows */}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow sm:hidden">
        <div class="p-4 space-y-4">
          <div
            onClick={() => handleCardClick('total')}
            class={`flex justify-between items-center ${getCardClasses('total')}`}
          >
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">Total Problems</h3>
            <p class="text-2xl font-bold text-blue-600">{props.totalProblems}</p>
          </div>
          <div
            onClick={() => handleCardClick('easy')}
            class={`flex justify-between items-center ${getCardClasses('easy')}`}
          >
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">Easy</h3>
            <p class="text-2xl font-bold text-green-600">{props.difficultyCounts.easy}</p>
          </div>
          <div
            onClick={() => handleCardClick('medium')}
            class={`flex justify-between items-center ${getCardClasses('medium')}`}
          >
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">Medium</h3>
            <p class="text-2xl font-bold text-yellow-600">{props.difficultyCounts.medium}</p>
          </div>
          <div
            onClick={() => handleCardClick('hard')}
            class={`flex justify-between items-center ${getCardClasses('hard')}`}
          >
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">Hard</h3>
            <p class="text-2xl font-bold text-red-600">{props.difficultyCounts.hard}</p>
          </div>
        </div>
      </div>

      {/* Desktop: Individual cards with gaps */}
      <div class="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => handleCardClick('total')}
          class={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow ${getCardClasses('total')}`}
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Problems</h3>
          <p class="text-3xl font-bold text-blue-600">{props.totalProblems}</p>
        </div>
        <div
          onClick={() => handleCardClick('easy')}
          class={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow ${getCardClasses('easy')}`}
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy</h3>
          <p class="text-3xl font-bold text-green-600">{props.difficultyCounts.easy}</p>
        </div>
        <div
          onClick={() => handleCardClick('medium')}
          class={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow ${getCardClasses('medium')}`}
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Medium</h3>
          <p class="text-3xl font-bold text-yellow-600">{props.difficultyCounts.medium}</p>
        </div>
        <div
          onClick={() => handleCardClick('hard')}
          class={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow ${getCardClasses('hard')}`}
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hard</h3>
          <p class="text-3xl font-bold text-red-600">{props.difficultyCounts.hard}</p>
        </div>
      </div>
    </div>
  );
}

