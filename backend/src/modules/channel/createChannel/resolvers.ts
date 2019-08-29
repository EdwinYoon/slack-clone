import { ResolverMap } from '../../../types/RevolserMap';
import { Channel, Team } from '../../../entity';
import {
  duplicateChannelNameError,
  wrongTeamNameError,
} from './createChannelError';

export const resolvers: ResolverMap = {
  Mutation: {
    createChannel: async (
      _,
      { channelName, isPublic }: GQL.ICreateChannelOnMutationArguments,
      { session }
    ) => {
      const team = await Team.findOne({ where: { id: session.teamId } });

      if (!team) {
        return {
          errors: [wrongTeamNameError],
        };
      }

      /** Check if Channel Name exist already */
      const existingChannels = await Channel.createQueryBuilder('channel')
        .innerJoin('channel.team', 'team')
        .where('team.id = :id', { id: team.id })
        .getMany();

      if (!existingChannels) {
        return {
          errors: [duplicateChannelNameError],
        };
      }

      /** Otherwise, assume that there is no problem */
      const newChannel = Channel.create({
        name: channelName,
        isPublic,
        team,
      });
      await newChannel.save();

      return {
        approved: true,
      };
    },
  },
};
