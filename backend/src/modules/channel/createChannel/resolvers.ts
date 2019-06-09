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
      /** Check if Channel Name exist already */
      const duplicateChannel = await Channel.findOne({
        where: { name: channelName },
      });

      if (duplicateChannel) {
        return {
          errors: [duplicateChannelNameError],
        };
      }

      /** Check if team name is wrong */
      const possibleTeamName = await Team.findOne({ name: teamName });

      if (!possibleTeamName) {
        return {
          errors: [wrongTeamNameError],
        };
      }

      /** Otherwise, assume that there is no problem */
      const newChannel = Channel.create({
        name: channelName,
        isPublic,
        team: possibleTeamName,
      });
      await newChannel.save();

      return {
        approved: true,
      };
    },
  },
};
