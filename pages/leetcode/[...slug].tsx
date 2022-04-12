import Calculate from 'components/calculate/Calculate';
import TypescriptCode from 'components/code/TypescriptCode';
import {
  QuestionDataDocument,
  QuestionDataQuery,
} from 'graphql/leetcode/questionData.query';
import { getLocalLeetcodeSlugs } from 'lib/leetcode/getLeetcodeFiles';
import { getUrqlClientOptions } from 'lib/urql/getUrqlClientOptions';
import { extractFileSectionSource } from 'lib/utils/extractFileSection';
import { forkJoin } from 'lib/wonka/fokJoin';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { initUrqlClient, withUrqlClient, WithUrqlState } from 'next-urql';
import { ParsedUrlQuery } from 'querystring';
import { ssrExchange } from 'urql';
import { fromValue, map, pipe, toPromise } from 'wonka';

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

  const questionSource = client?.query(QuestionDataDocument, {
    titleSlug: slug,
  });

  const solutionContentSource = extractFileSectionSource({
    filePath: getLocalLeetcodeSlugs()[slug].filePath,
    startPredicate: (line) => line === '/* solution start */',
    endPradicate: (line) => line === '/* solution end */',
  });

  const result = await pipe(
    forkJoin([questionSource ?? fromValue(undefined), solutionContentSource]),
    map(([questionResult, solutionContent]) => {
      return {
        props: {
          solutionContent,
          questionData: questionResult?.data?.question,
          urqlState: ssrCache.extractData(),
        },
      };
    }),
    toPromise
  );

  return result;
};

const LeetcodePage: NextPage<StaticProps> = ({
  questionData,
  solutionContent,
}) => (
  <div>
    <h1>{questionData?.title}</h1>
    <Calculate />
    <p>{`Difficulty: ${questionData?.difficulty}`}</p>
    <div
      dangerouslySetInnerHTML={{ __html: questionData?.content ?? '' }}
    ></div>
    <TypescriptCode>{solutionContent}</TypescriptCode>
  </div>
);

export default withUrqlClient(getUrqlClientOptions)(LeetcodePage);
