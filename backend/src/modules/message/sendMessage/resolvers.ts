import { ResolverMap } from '../../../types/customTypes';
import { Message, Team, Channel, User } from '../../../entity';
import { NEW_MESSAGE_SUBSCRIPTION } from '../common/constants';

export const resolvers: ResolverMap = {
  Mutation: {
    sendMessage: async (
      _,
      { text, channelId }: GQL.ISendMessageOnMutationArguments,
      { pubsub, session }
    ) => {
      try {
        const { userId, teamId } = session;
        const team = await Team.findOne({ where: { id: teamId } });
        const channel = await Channel.findOne({ where: { id: channelId } });
        const user = await User.findOne({ where: { id: userId } });
        const newMessage = Message.create({
          text,
          team,
          channel,
          user,
        });
        const createdMessage = await newMessage.save();
        const messageResponse = {
          id: createdMessage.id,
          text: createdMessage.text,
          user: {
            id: createdMessage.user.id,
            email: createdMessage.user.email,
          },
          updatedAt: createdMessage.updatedAt,
          createdAt: createdMessage.createdAt,
        };

        pubsub.publish(NEW_MESSAGE_SUBSCRIPTION, {
          newMessage: messageResponse,
        });

        return {
          approved: true,
        };
      } catch (e) {
        return {
          errors: [{ path: 'message', message: 'something went wrong' }],
        };
      }
    },
  },
};
