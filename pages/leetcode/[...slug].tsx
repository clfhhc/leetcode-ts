import importedLeetcodeArray from 'lib/leetcode/requireContextForLeetcode';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface SlugParsedUrlQuery extends ParsedUrlQuery {
  slug: string | string[];
}

export interface PageProps {
  slug: string;
  solutionContent: string;
}

export interface StaticProps extends PageProps {}

export const getStaticPaths: GetStaticPaths<SlugParsedUrlQuery> = async () => {
  const paths = Object.keys(importedLeetcodeArray).map((slug) => ({
    params: { slug: [slug] },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const slug =
    typeof params?.slug === 'string'
      ? params.slug
      : Array.isArray(params?.slug)
      ? (params?.slug as string[]).join('/')
      : 'index';

  const solutionContent = importedLeetcodeArray[slug].default.toString();

  return {
    props: {
      slug,
      solutionContent,
    },
  };
};

const LeetcodePage: NextPage<StaticProps> = ({ slug, solutionContent }) => (
  <div>
    <h1>{slug}</h1>
    <pre>
      <code>{solutionContent}</code>
    </pre>
  </div>
);

export default LeetcodePage;
