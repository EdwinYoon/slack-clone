import { PubSub } from 'graphql-yoga';
import { Redis } from 'ioredis';

export interface ISession extends Express.Session {
  userId?: string;
  teamId?: string;
}

export interface IContext {
  redis: Redis;
  req: Express.Request;
  session: ISession | any;
  pubsub: PubSub;
}

export type Resolver = (
  parent: any,
  args: any,
  context: IContext | any,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
