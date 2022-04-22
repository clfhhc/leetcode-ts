import Calculate from 'components/calculate/Calculate';
import TypescriptCode from 'components/code/TypescriptCode';
import DifficultyLabel from 'components/DifficultyLabel';
import PlasmicSolution from 'components/plasmic/leetcode_ts/PlasmicSolution';
import LeetcodeQuestion from 'components/question/LeetcodeQuestion';
import QuestionLink from 'components/question/QuestionLink';
import {
  QuestionDataDocument,
  QuestionDataQuery,
} from 'graphql/leetcode/questionData.query';
import { getLocalLeetcodeSlugs } from 'lib/leetcode/getLeetcodeFiles';
import { getUrqlClientOptions } from 'lib/urql/getUrqlClientOptions';
import { makeLocalStorage } from 'lib/urql/makeLocalStorage';
import { extractFileSectionSource } from 'lib/utils/readFile';
import { forkJoin } from 'lib/wonka/forkJoin';
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
    fallback: false,
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
  const storage = makeLocalStorage();
  const urqlClientOptions = getUrqlClientOptions(storage)(ssrCache);
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
  <PlasmicSolution
    titleText={`${questionData?.questionId}. ${questionData?.title}`}
    question={<LeetcodeQuestion content={questionData?.content} />}
    difficultyLabel={<DifficultyLabel difficulty={questionData?.difficulty} />}
    solution={<TypescriptCode>{solutionContent}</TypescriptCode>}
    originialQuestionLink={
      <QuestionLink
        originalQuestionUrl={`https://leetcode.com${questionData?.questionDetailUrl}`}
      />
    }
  ></PlasmicSolution>
);

export default withUrqlClient(getUrqlClientOptions())(LeetcodePage);
