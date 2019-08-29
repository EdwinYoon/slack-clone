import { authError } from '../modules/common/sharedError';

const authMiddlewareResolver = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  /** Require both teamId and userId */
  if (context.session.teamId && context.session.userId) {
    return resolve(root, args, context, info);
  }

  return {
    errors: [authError],
  };
};

const teamContextMiddleware = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
) => {
  /** Only require teamId */
  if (context.session.teamId) {
    return resolve(root, args, context, info);
  }

  return {
    errors: [authError],
  };
};

/** Register schema for auth validation */
export default {
  Query: {
    channels: authMiddlewareResolver,
    messages: authMiddlewareResolver,
    getUsersByTeam: authMiddlewareResolver,
  },
  Mutation: {
    createChannel: authMiddlewareResolver,
    sendMessage: authMiddlewareResolver,
    createDirectMessageChannel: authMiddlewareResolver,
    registerToTeam: teamContextMiddleware,
    login: teamContextMiddleware,
  },
};
