import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Title from 'components/Title';
import { getLocalLeetcodeSlugs } from 'lib/leetcode/getLeetcodeFiles';
import Calculate from 'components/calculate/Calculate';

export interface PageProps {
  leetcodeSlugs?: string[];
}

export interface StaticProps extends PageProps {}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const slugs = getLocalLeetcodeSlugs();
  const leetcodeSlugs = Object.keys(slugs);
  return {
    props: {
      leetcodeSlugs,
    },
  };
};

const Home: NextPage<StaticProps> = ({ leetcodeSlugs }) => {
  return (
    <div>
      <Title title="Leetcode Typescript Solutions" />
      <Calculate />
      {leetcodeSlugs?.map((slug) => (
        <Link key={slug} href={`/leetcode/${slug}`}>
          {slug}
        </Link>
      ))}
    </div>
  );
};

export default Home;
