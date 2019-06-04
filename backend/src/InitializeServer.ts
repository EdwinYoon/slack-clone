import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { generateSchemas, ormConnectionHandler } from './utils';

export default async () => {
  const schema = generateSchemas();

  const server = await new GraphQLServer({ schema });
  await ormConnectionHandler();

  const port = process.env.APP_PORT || 4000;
  const app = await server.start({ port });
  console.log(`Server is not running at ${port}`);

  return app;
};
