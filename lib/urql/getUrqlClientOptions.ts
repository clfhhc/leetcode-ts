import { NextUrqlClientConfig } from 'next-urql';
import { debugExchange, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { getIsClient, getIsProduction } from 'lib/utils/getEnv';
import { urls } from 'lib/graphql/urls';

export const getUrqlClientOptions: NextUrqlClientConfig = (ssrCache) => {
  const isCLient = getIsClient();
  const isProduction = getIsProduction();

  return {
    url: urls['leetcode'],
    exchanges: [
      dedupExchange,
      cacheExchange({}),
      ...(isCLient && !isProduction ? [debugExchange] : []),
      // ssrExchange has to come after cacheExchange and before fetchExchange
      ssrCache,
      fetchExchange,
    ],
  };
};
