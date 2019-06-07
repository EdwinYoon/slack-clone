import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import * as cookieParser from 'cookie-parser';
import {
  generateSchemas,
  ormConnectionHandler,
  authTokenValidator,
} from './utils';

export default async () => {
  const schema = generateSchemas();

  const server = await new GraphQLServer({
    schema,
    context: ({ request, response }: any) => ({ req: request, res: response }),
  });

  // Token Validation Middlewares
  server.express.use(cookieParser());
  server.express.use(authTokenValidator);

  // DB CONNECTION
  await ormConnectionHandler();

  const port = process.env.APP_PORT || 4000;
  const app = await server.start({ port });
  console.log(`Server is not running at ${port}`);

  return app;
};
