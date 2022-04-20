import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { getLocalLeetcodeSlugs } from 'lib/leetcode/getLeetcodeFiles';
import { PlasmicTable } from '../components/plasmic/leetcode_ts/PlasmicTable';

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

const Table: NextPage<StaticProps> = ({ leetcodeSlugs }) => {
  return (
    <>
      {
        // Props you can pass into PlasmicTable are:
        // 1. Variants you want to activate,
        // 2. Contents for slots you want to fill,
        // 3. Overrides for any named node in the component to attach behavior and data,
        // 4. Props to set on the root node.
      }
      <PlasmicTable
        table={leetcodeSlugs?.map((slug) => (
          <Link key={slug} href={`/leetcode/${slug}`}>
            {slug}
          </Link>
        ))}
      />
    </>
  );
};

export default Table;
