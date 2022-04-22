import Link from 'next/link';
import { FC } from 'react';
import styles from './LeetcodeQuestion.module.css';

export interface Props {
  content: string | null | undefined;
  className?: string;
}
const LeetcodeQuestion: FC<Props> = ({ content, className }) => {
  return (
    <div className={className || styles.question}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
    </div>
  );
};

export default LeetcodeQuestion;
