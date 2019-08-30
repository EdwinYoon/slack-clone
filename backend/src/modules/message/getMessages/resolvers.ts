import { ResolverMap } from '../../../types/customTypes';
import { Message } from '../../../entity';

export const resolvers: ResolverMap = {
  Query: {
    messages: async (_, { channelId }) => {
      const messages = await Message.find({
        where: { channel: channelId },
        relations: ['user'],
      });

      return messages;
    },
  },
};
