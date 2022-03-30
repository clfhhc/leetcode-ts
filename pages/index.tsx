import type { NextPage } from 'next';
import Title from '../components/Title';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Title isItalics={true} title="Homepage" />
      <p>{process.env.NEXT_PUBLIC_ENV}</p>
    </div>
  );
};

export default Home;
