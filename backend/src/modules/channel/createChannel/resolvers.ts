import { ResolverMap } from '../../../types/RevolserMap';
import { Channel, Team } from '../../../entity';
import {
  duplicateChannelNameError,
  wrongTeamNameError,
} from './createChannelError';

export const resolvers: ResolverMap = {
  Query: {
    channels: async (_, { teamName }: GQL.IChannelsOnQueryArguments) => {
      /** Check if team name is exist */
      const team = await Team.findOne({ where: { name: teamName } });

      if (!team) {
        return {
          errors: [wrongTeamNameError],
        };
      }

      /** Get channels on that team */
      const existingChannels = await Channel.createQueryBuilder('channel')
        .innerJoin('channel.team', 'team')
        .where('team.id = :id', { id: team.id })
        .getMany();

      return existingChannels;
    },
  },
  Mutation: {
    createChannel: async (
      _,
      { channelName, teamName, isPublic }: GQL.ICreateChannelOnMutationArguments
    ) => {
      const team = await Team.findOne({ where: { name: teamName } });

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
