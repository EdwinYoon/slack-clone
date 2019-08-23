import { ResolverMap } from '../../../types/RevolserMap';
import { Message, Team, Channel, User } from '../../../entity';

export const resolvers: ResolverMap = {
  Mutation: {
    sendMessage: async (
      _,
      { text, userId, teamId, channelId }: GQL.ISendMessageOnMutationArguments
    ) => {
      console.log('===== User ID ================================= ');
      console.log(userId);
      try {
        const team = await Team.findOne({ where: { id: teamId } });
        const channel = await Channel.findOne({ where: { id: channelId } });
        const user = await User.findOne({ where: { id: userId } });
        const newMessage = Message.create({
          text,
          team,
          channel,
          user,
        });
        await newMessage.save();

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
