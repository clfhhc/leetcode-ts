import DifficultyLabel from 'components/DifficultyLabel';
import { DefaultDifficultyLabelProps } from 'components/plasmic/leetcode_ts/PlasmicDifficultyLabel';
import { FC } from 'react';
import styles from './LeetcodeQuestion.module.css';

export interface Props {
  difficulty: string | null | undefined;
  content: string | null | undefined;
  className?: string;
}
const LeetcodeQuestion: FC<Props> = ({ content, className, difficulty }) => {
  return (
    <div className={className}>
      {difficulty && (
        <DifficultyLabel
          className={styles['difficulty-label']}
          difficulty={
            difficulty.toLowerCase() as DefaultDifficultyLabelProps['difficulty']
          }
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
