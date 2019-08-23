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
    context: ({ request, response }: any) => {
      return { req: request, res: response, userId: request.userId };
    },
  });

  // Token Validation Middlewares
  server.express.use(cookieParser());
  server.express.use(authTokenValidator);

  // DB CONNECTION
  await ormConnectionHandler();

  const port = process.env.APP_PORT || 4000;
  const app = await server.start({
    port,
    cors: { origin: 'http://localhost:3000' },
  });
  console.log(`Server is now running at ${port}`);

  return app;
};
