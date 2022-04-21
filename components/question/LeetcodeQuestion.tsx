import Link from 'next/link';
import { FC } from 'react';
import styles from './LeetcodeQuestion.module.css';

export interface Props {
  originalQuestionUrl: string | null | undefined;
  content: string | null | undefined;
  className?: string;
}
const LeetcodeQuestion: FC<Props> = ({
  content,
  className,
  originalQuestionUrl,
}) => {
  return (
    <div className={className || styles.question}>
      {originalQuestionUrl && (
        <div className={styles['question-link']}>
          <Link href={originalQuestionUrl}>Original Question ➤</Link>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
    </div>
  );
};

export default LeetcodeQuestion;
