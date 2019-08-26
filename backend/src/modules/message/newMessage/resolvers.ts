import { ResolverMap } from '../../../types/RevolserMap';
import { NEW_MESSAGE_SUBSCRIPTION } from '../common/constants';

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => {
        console.log('hit11111111');
        return pubsub.asyncIterator(NEW_MESSAGE_SUBSCRIPTION);
      },
    },
  },
};
