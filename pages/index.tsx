import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Title from 'components/Title';
import styles from 'styles/Home.module.css';
import { getLocalLeetcodeSlugs } from 'lib/leetcode/getLeetcodeFiles';

export interface PageProps {
  leetcodeSlugs?: string[];
}

export interface StaticProps extends PageProps {}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const slugs = getLocalLeetcodeSlugs();
  const { filePath } = slugs['add-two-numbers'];
  const leetcodeSlugs = Object.keys(slugs);
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
      {leetcodeSlugs?.map((slug) => (
        <Link key={slug} href={`/leetcode/${slug}`}>
          {slug}
        </Link>
      ))}
    </div>
  );
};

export default Home;
