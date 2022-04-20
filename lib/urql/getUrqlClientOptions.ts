import { NextUrqlClientConfig } from 'next-urql';
import { debugExchange, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Data } from '@urql/exchange-graphcache';
import { getIsClient, getIsProduction } from 'lib/utils/getEnv';
import { urls } from 'lib/graphql/urls';
import { QuestionDataQuery } from 'graphql/leetcode/questionData.query';

export const getUrqlClientOptions: NextUrqlClientConfig = (ssrCache) => {
  const isCLient = getIsClient();
  const isProduction = getIsProduction();

  return {
    url: urls['leetcode'],
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          QuestionNode: (data: Data & QuestionDataQuery['question']) =>
            data?.titleSlug ?? null,
          TopicTagNode: (
            data: Data &
              NonNullable<
                NonNullable<QuestionDataQuery['question']>['topicTags']
              >[number]
          ) => data.id ?? null,
          PagifiedQuestionNode: () => null,
        },
      }),
      ...(isCLient && !isProduction ? [debugExchange] : []),
      // ssrExchange has to come after cacheExchange and before fetchExchange
      ssrCache,
      fetchExchange,
    ],
  };
};
