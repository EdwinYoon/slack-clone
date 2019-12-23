import { ResolverMap, IContext } from '../../../types/customTypes';
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
      { session }: IContext
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
        .andWhere('channel.name = :name', { name: channelName })
        .getOne();

      if (existingChannels) {
        return {
          errors: [duplicateChannelNameError],
        };
      }

      /** Otherwise, assume that there is no problem */
      const newChannel = await Channel.create({
        name: channelName,
        isPublic,
        team,
      }).save();
      console.log(newChannel);

      return {
        approved: true,
      };
    },
  },
};
