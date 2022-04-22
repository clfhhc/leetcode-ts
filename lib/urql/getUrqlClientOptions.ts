import { NextUrqlClientConfig } from 'next-urql';
import { debugExchange, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Data, StorageAdapter } from '@urql/exchange-graphcache';
import { getIsClient, getIsProduction } from 'lib/utils/getEnv';
import { urls } from 'lib/graphql/urls';
import { QuestionDataQuery } from 'graphql/leetcode/questionData.query';

export const getUrqlClientOptions =
  (storage?: StorageAdapter): NextUrqlClientConfig =>
  (ssrCache) => {
    const isClient = getIsClient();
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
          ...(storage ? { storage } : {}),
        }),
        ...(isClient && !isProduction ? [debugExchange] : []),
        // ssrExchange has to come after cacheExchange and before fetchExchange
        ssrCache,
        fetchExchange,
      ],
    };
  };
