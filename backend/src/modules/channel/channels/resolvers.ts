import { ResolverMap, IContext } from '../../../types/customTypes';
import { Team, Channel, User, ChannelMember } from '../../../entity';
import {
  invalidTeamError,
  invalidUserError,
  unexpectedError,
} from '../../common/sharedError';

export const resolvers: ResolverMap = {
  Query: {
    channels: async (_, __, { session }: IContext) => {
      const { teamId, userId } = session;
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
        // .leftJoin('c.team', 'team')
        .innerJoin(Team, 'team', 'team.id = c.team')
        .innerJoin(ChannelMember, 'cm', 'cm.channelId = c.id')
        .where('cm.userId = :uid', { uid: userId })
        .getMany();
      // .where('team.id = :tid', { tid: teamId })

      console.log(userChannels);
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
