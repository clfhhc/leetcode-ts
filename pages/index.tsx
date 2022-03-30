import type { NextPage } from 'next';
import Title from '../components/Title';
import twoSum from '../leetcode/two-sum';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Title isItalics={true} title="Homepage" />
      <p>{process.env.NEXT_PUBLIC_ENV}</p>
      <pre>
        <code>{twoSum.toString()}</code>
      </pre>
    </div>
  );
};

export default Home;
