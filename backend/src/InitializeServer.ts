import 'reflect-metadata';
import { GraphQLServer, PubSub } from 'graphql-yoga';
require('dotenv-safe').config();
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { generateSchemas, ormConnectionHandler } from './utils';

const { APP_PORT, SESSION_SECRET, NODE_ENV } = process.env;

export default async () => {
  const schema = generateSchemas();

  const pubsub = new PubSub();

  const server = await new GraphQLServer({
    schema,
    context: ({ request, response }: any) => {
      return {
        req: request,
        res: response,
        pubsub,
      };
    },
  });

  // Token Validation Middlewares
  server.express.use(cookieParser(SESSION_SECRET));
  server.express.use(
    session({
      name: 'qid',
      secret: SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );

  // DB CONNECTION
  await ormConnectionHandler();

  const port = (APP_PORT as string) || 4000;
  const app = await server.start({
    port,
    cors: { origin: 'http://localhost:3000' },
  });
  console.log(`Server is now running at ${port}`);

  return app;
};
