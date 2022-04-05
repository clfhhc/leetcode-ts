import TypescriptCode from 'components/code/TypescriptCode';
import {
  QuestionDataDocument,
  QuestionDataQuery,
} from 'graphql/leetcode/questionData.query';
import { getLocalLeetcodeSlugs } from 'lib/leetcode/getLeetcodeFiles';
import { getUrqlClientOptions } from 'lib/urql/getUrqlClientOptions';
import { extractFileSection } from 'lib/utils/extractFileSection';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { initUrqlClient, withUrqlClient, WithUrqlState } from 'next-urql';
import { ParsedUrlQuery } from 'querystring';
import { ssrExchange } from 'urql';

export interface SlugParsedUrlQuery extends ParsedUrlQuery {
  slug: string | string[];
}

export interface PageProps {
  solutionContent: string;
  questionData: QuestionDataQuery['question'];
}

export interface StaticProps extends PageProps, WithUrqlState {}

export const getStaticPaths: GetStaticPaths<SlugParsedUrlQuery> = async () => {
  const paths = Object.keys(getLocalLeetcodeSlugs()).map((slug) => ({
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

  const ssrCache = ssrExchange({ isClient: false });
  const urqlClientOptions = getUrqlClientOptions(ssrCache);
  const client = initUrqlClient(urqlClientOptions, false);

  const questionRequest = client
    ?.query(QuestionDataDocument, { titleSlug: slug })
    .toPromise();

  const solutionContentRequest = extractFileSection({
    filePath: getLocalLeetcodeSlugs()[slug].filePath,
    startPredicate: (line) => line === '/* solution start */',
    endPradicate: (line) => line === '/* solution end */',
  });

  const solutionContent = await solutionContentRequest;
  const questionData = (await questionRequest)?.data?.question;

  return {
    props: {
      solutionContent,
      questionData,
      urqlState: ssrCache.extractData(),
    },
  };
};

const LeetcodePage: NextPage<StaticProps> = ({
  questionData,
  solutionContent,
}) => (
  <div>
    <h1>{questionData?.title}</h1>
    <p>{`Difficulty: ${questionData?.difficulty}`}</p>
    <div
      dangerouslySetInnerHTML={{ __html: questionData?.content ?? '' }}
    ></div>
    <TypescriptCode>{solutionContent}</TypescriptCode>
  </div>
);

export default withUrqlClient(getUrqlClientOptions)(LeetcodePage);
