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

export interface PageProps {
  leetcodeSlugs?: string[];
  leetcodeQuestions?: QuestionListQuery['questionList']['data'];
}

export interface StaticProps extends PageProps {}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const slugs = getLocalLeetcodeSlugs();
  const leetcodeSlugs = Object.keys(slugs);

  const ssrCache = ssrExchange({ isClient: false });
  const urqlClientOptions = getUrqlClientOptions(ssrCache);
  const client = initUrqlClient(urqlClientOptions, false);

  const questionListSource = client?.query(QuestionListDocument, {
    categorySlug: '',
    skip: 0,
    limit: 50,
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
      return {
        props: {
          leetcodeSlugs,
          leetcodeQuestions: data.data?.questionList.data,
        },
      };
    }),
    toPromise
  );
  return result;
};

const Table: NextPage<StaticProps> = ({ leetcodeSlugs, leetcodeQuestions }) => {
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
      />
    </>
  );
};

export default withUrqlClient(getUrqlClientOptions)(Table);
