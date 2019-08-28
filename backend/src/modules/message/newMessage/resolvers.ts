import { ResolverMap } from '../../../types/RevolserMap';
import { NEW_MESSAGE_SUBSCRIPTION } from '../common/constants';

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator(NEW_MESSAGE_SUBSCRIPTION);
      },
    },
  },
};
