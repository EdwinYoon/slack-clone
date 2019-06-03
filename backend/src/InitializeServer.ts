import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { GraphQLServer } from 'graphql-yoga';
import { generateSchemas } from './utils';

export default async () => {
  const schema = generateSchemas();

  const server = await new GraphQLServer({ schema });
  await createConnection();

  const port = process.env.APP_PORT || 4000;
  const app = await server.start({ port });
  console.log(`Server is not running at ${port}`);

  return app;
};
