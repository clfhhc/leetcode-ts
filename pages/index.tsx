import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Title from 'components/Title';
import styles from 'styles/Home.module.css';
import importedLeetcodeArray from 'lib/leetcode/requireContextForLeetcode';

export interface PageProps {
  leetcodeSlugs?: string[];
}

export interface StaticProps extends PageProps {}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const leetcodeSlugs = Object.keys(importedLeetcodeArray);
  return {
    props: {
      leetcodeSlugs,
    },
  };
};

const Home: NextPage<StaticProps> = ({ leetcodeSlugs }) => {
  return (
    <div className={styles.container}>
      <Title title="Leetcode Typescript Solutions" />
      <p>{process.env.NEXT_PUBLIC_ENV}</p>
      {leetcodeSlugs?.map((slug) => (
        <Link key={slug} href={`/leetcode/${slug}`}>
          {slug}
        </Link>
      ))}
    </div>
  );
};

export default Home;
