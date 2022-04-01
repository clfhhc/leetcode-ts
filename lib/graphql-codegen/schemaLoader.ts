import fetch from 'cross-fetch';
import {
  getIntrospectionQuery,
  buildClientSchema,
  IntrospectionQuery,
} from 'graphql';
// load env files first
import 'lib/utils/serverLoadEnvConfig';
import { urls } from 'lib/graphql/urls';

const schemaLoader = async (schemaString: string, config: any) => {
  console.log('schemaString: ', schemaString);
  console.log('config: ', config);
  const introspectionQuery = getIntrospectionQuery({ descriptions: false });

  const url =
    schemaString in urls ? urls[schemaString as keyof typeof urls] : '';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const data: { data: IntrospectionQuery } = await response.json();

  return buildClientSchema(data.data);
};

export default schemaLoader;
