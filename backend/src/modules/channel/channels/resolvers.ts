import { ResolverMap } from '../../../types/RevolserMap';
import { Team, Channel, User, ChannelMember } from '../../../entity';
import {
  invalidTeamError,
  invalidUserError,
  unexpectedError,
} from '../../common/sharedError';

export const resolvers: ResolverMap = {
  Query: {
    channels: async (_, { teamId, userId }: GQL.IChannelsOnQueryArguments) => {
      /** Check if team name is exist */
      const team = await Team.findOne({ where: { id: teamId } });

      if (!team) {
        return {
          errors: [invalidTeamError('channels')],
        };
      }

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return {
          errors: [invalidUserError('channels')],
        };
      }

      /** Get channels on that team */
      const userChannels = await Channel.createQueryBuilder('c')
        .leftJoin('c.team', 'team')
        .innerJoin(ChannelMember, 'cm', 'cm.channelId = c.id')
        .where('team.id = :tid', { tid: teamId })
        .andWhere('cm.userId = :uid', { uid: userId })
        .getMany();

      if (!userChannels) {
        return {
          errors: [unexpectedError('channels')],
        };
      }
      return {
        channels: userChannels,
      };
    },
  },
};
