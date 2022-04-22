import Link from 'next/link';
import { FC } from 'react';
import styles from './LeetcodeQuestion.module.css';

export interface Props {
  originalQuestionUrl: string | null | undefined;
}

const QuestionLink: FC<Props> = ({ originalQuestionUrl }) => {
  return originalQuestionUrl ? (
    <div className={styles['question-link']}>
      <Link href={originalQuestionUrl}>Original Question ➤</Link>
    </div>
  ) : null;
};

export default QuestionLink;
