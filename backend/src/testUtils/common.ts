import { request } from 'graphql-request';

export const testRequest = async (gqlString: string) =>
  request(process.env.TEST_HOST as string, gqlString);
