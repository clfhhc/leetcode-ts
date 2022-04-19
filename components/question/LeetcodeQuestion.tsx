import { FC } from 'react';
import styles from './LeetcodeQuestion.module.css';

export interface Props {
  content: string | null | undefined;
  className?: string;
}
const LeetcodeQuestion: FC<Props> = ({
  content,
  className = styles.question,
}) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: content ?? '' }}
    />
  );
};

export default LeetcodeQuestion;
