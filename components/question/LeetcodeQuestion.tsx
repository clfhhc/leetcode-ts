import DifficultyLabel, {
  DifficultyLabelProps,
} from 'components/DifficultyLabel';
import { FC } from 'react';
import styles from './LeetcodeQuestion.module.css';

export interface Props {
  difficulty: DifficultyLabelProps['difficulty'];
  content: string | null | undefined;
  className?: string;
}
const LeetcodeQuestion: FC<Props> = ({ content, className, difficulty }) => {
  return (
    <div className={className}>
      {difficulty && (
        <DifficultyLabel
          className={styles['difficulty-label']}
          difficulty={difficulty}
        />
      )}
      <div
        className={styles.question}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
    </div>
  );
};

export default LeetcodeQuestion;
