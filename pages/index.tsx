import type { GetStaticProps, NextPage } from 'next';
import { getLocalLeetcodeSlugs } from 'lib/leetcode/getLeetcodeFiles';
import { PlasmicTable } from '../components/plasmic/leetcode_ts/PlasmicTable';
import { ssrExchange } from 'urql';
import { getUrqlClientOptions } from 'lib/urql/getUrqlClientOptions';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import {
  QuestionListDocument,
  QuestionListQuery,
} from 'graphql/leetcode/questionList.query';
import { map, pipe, take, toPromise } from 'wonka';
import QuestionList from 'components/question-list/QuestionList';
import { useRouter } from 'next/router';
import { getIsProduction } from 'lib/utils/getEnv';
import { makeLocalStorage } from 'lib/urql/makeLocalStorage';

export interface PageProps {
  leetcodeSlugs?: string[];
  leetcodeQuestions?: QuestionListQuery['questionList']['data'];
}

export interface StaticProps extends PageProps {}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const slugs = getLocalLeetcodeSlugs();
  const leetcodeSlugs = Object.keys(slugs);

  const ssrCache = ssrExchange({ isClient: false });
  const storage = makeLocalStorage();
  const urqlClientOptions = getUrqlClientOptions(storage)(ssrCache);
  const client = initUrqlClient(urqlClientOptions, false);

  const questionListSource = client?.query(QuestionListDocument, {
    categorySlug: '',
    skip: 0,
    limit: -1,
    filters: {},
  });

  if (!questionListSource) {
    return {
      props: {
        leetcodeSlugs,
      },
    };
  }

  const result = await pipe(
    questionListSource,
    take(1),
    map((data) => {
      const leetcodeQuestions = data.data?.questionList.data?.filter(
        (question) =>
          question.titleSlug && leetcodeSlugs.includes(question.titleSlug)
      );
      return {
        props: {
          leetcodeSlugs,
          leetcodeQuestions,
        },
      };
    }),
    toPromise
  );
  return result;
};

const Table: NextPage<StaticProps> = ({ leetcodeSlugs, leetcodeQuestions }) => {
  const { basePath } = useRouter();
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
        table={
          <QuestionList
            leetcodeQuestions={leetcodeQuestions}
            leetcodeSlugs={leetcodeSlugs}
          />
        }
        titleBlock={{
          style: {
            ['UserDrag' as any]: 'none',
            ['WebkitUserDrag' as any]: 'none',
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
          },
        }}
        leetcodeLogo={{
          src: `${basePath}/plasmic/leetcode_ts/images/leetcodeLogo.png`,
        }}
        typescriptLogo={{
          src: `${basePath}/plasmic/leetcode_ts/images/typescriptLogo.png`,
        }}
      />
    </>
  );
};

export default withUrqlClient(getUrqlClientOptions())(Table);
