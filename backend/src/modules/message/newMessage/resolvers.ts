import { ResolverMap, IContext } from '../../../types/customTypes';
import { NEW_MESSAGE_SUBSCRIPTION } from '../common/constants';

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }: IContext) => {
        return pubsub.asyncIterator(NEW_MESSAGE_SUBSCRIPTION);
      },
    },
  },
};
