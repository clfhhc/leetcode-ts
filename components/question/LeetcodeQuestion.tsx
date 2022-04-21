import { FC } from 'react';
import styles from './LeetcodeQuestion.module.css';

export interface Props {
  content: string | null | undefined;
  className?: string;
}
const LeetcodeQuestion: FC<Props> = ({ content, className }) => {
  return (
    <div
      className={className || styles.question}
      dangerouslySetInnerHTML={{ __html: content ?? '' }}
    />
  );
};

export default LeetcodeQuestion;
