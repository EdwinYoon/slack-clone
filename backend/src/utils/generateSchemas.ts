import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import * as path from 'path';
import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as glob from 'glob';

export default () => {
  const basePath = path.join(__dirname, '../modules');

  const types = glob
    .sync(`${basePath}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: 'utf8' }));

  const resolvers = glob
    .sync(`${basePath}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);
  console.log(resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(types),
    resolvers: mergeResolvers(resolvers),
  });
};
