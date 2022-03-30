import type { NextPage } from 'next';
import Title from '../components/Title';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Title isItalics={true} title="Homepage" />
    </div>
  );
};

export default Home;
