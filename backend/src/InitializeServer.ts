import 'reflect-metadata';
import { GraphQLServer, PubSub } from 'graphql-yoga';
require('dotenv-safe').config();
import * as Redis from 'ioredis';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import { generateSchemas, ormConnectionHandler } from './utils';

const { APP_PORT, SESSION_SECRET, NODE_ENV } = process.env;

export default async () => {
  const schema = generateSchemas();

  const pubsub = new PubSub();

  const RedisStore = connectRedis(session);
  const client = new Redis() as any;

  const server = await new GraphQLServer({
    schema,
    context: ({ request, response }: any) => {
      return {
        req: request,
        res: response,
        session: request.session,
        pubsub,
      };
    },
  });

  console.log(NODE_ENV);

  // Token Validation Middlewares
  // server.express.use(cookieParser(SESSION_SECRET));
  server.express.use(
    session({
      store: new RedisStore({ client }),
      name: 'qid',
      secret: SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
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
    cors: { origin: 'http://localhost:3000', credentials: true },
  });
  console.log(`Server is now running at ${port}`);

  return app;
};
