// import { createQueryBuilder } from 'typeorm';
import { ResolverMap } from '../../../types/RevolserMap';
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
