import { withFilter } from 'graphql-yoga';
import { ResolverMap } from '../../../types/customTypes';
import { NEW_MESSAGE_SUBSCRIPTION } from '../common/constants';

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGE_SUBSCRIPTION),
        (payload, variables) =>
          payload.newMessage.channelId === variables.channelId
      ),
    },
  },
};
