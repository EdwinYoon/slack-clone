import { PubSub } from 'graphql-yoga';

export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}

export interface ISession {
  userId?: string;
  teamId?: string;
}

export interface IContext {
  req: Request;
  res: Response;
  pubsub: PubSub;
  session: ISession;
}

export type IMiddleware = (
  resolve: Resolver,
  parent: any,
  args: any,
  context: IContext,
  info: any
) => any;
