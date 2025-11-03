import { createSignal } from 'solid-js';
import SummaryCards from './SummaryCards';
import ProblemList from './ProblemList';

interface ProblemMeta {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  difficulty: string;
}

interface HomePageContentProps {
  problems: ProblemMeta[];
  totalProblems: number;
  difficultyCounts: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export default function HomePageContent(props: HomePageContentProps) {
  const [difficultyFilter, setDifficultyFilter] = createSignal<string>('all');

  const handleDifficultyFilterChange = (filter: string) => {
    setDifficultyFilter(filter);
  };

  return (
    <>
      <SummaryCards
        totalProblems={props.totalProblems}
        difficultyCounts={props.difficultyCounts}
        onDifficultyFilterChange={handleDifficultyFilterChange}
        currentFilter={difficultyFilter()}
      />
      <ProblemList
        problems={props.problems}
        initialDifficultyFilter={difficultyFilter()}
        onDifficultyFilterChange={handleDifficultyFilterChange}
      />
    </>
  );
}

