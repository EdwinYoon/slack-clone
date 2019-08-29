import { getManager } from 'typeorm';
import { ResolverMap, IContext } from '../../../types/customTypes';
import { Team, TeamMember, Channel, ChannelMember } from '../../../entity';
import { invalidChannelNameError } from './createDirectMessageChannelError';
import {
  unexpectedError,
  invalidTeamError,
  invalidUserError,
} from '../../common/sharedError';

export const resolvers: ResolverMap = {
  Mutation: {
    createDirectMessageChannel: async (
      _,
      {
        users,
        channelName,
        isPublic,
      }: GQL.ICreateDirectMessageChannelOnMutationArguments,
      { session }: IContext
    ) => {
      try {
        const { teamId } = session;
        const isTeamValid = await Team.findOne({ where: { id: teamId } });

        /** If the team is not found  */
        if (!isTeamValid) {
          return {
            errors: [invalidTeamError('createDirectMessageChannel')],
          };
        }

        const teamUsers = users.reduce((acc: [], val): any => {
          return [...acc, { ...val, teamId }];
        }, []);
        const memberInfo = await TeamMember.find({ where: teamUsers });

        /** If everyone is not in the team  */
        if (memberInfo.length !== teamUsers.length) {
          return {
            errors: [invalidUserError('createDirectMessageChannel')],
          };
        }

        const isChannelValid = await Channel.findOne({
          where: { name: channelName },
        });

        /** If channel name is taken already */
        if (isChannelValid) {
          return {
            errors: [invalidChannelNameError],
          };
        }
        await getManager().transaction(async transactionalEntityManager => {
          const newChannel = Channel.create({
            team: isTeamValid,
            name: channelName,
            isPublic,
            channelType: 'direct',
          });

          /** Create a channel first */
          await transactionalEntityManager.save(newChannel);

          /** Make the data as we insert them */
          const channelUsers = users.reduce((acc: [], val: any): any => {
            return [...acc, { userId: val.userId, channelId: newChannel.id }];
          }, []);

          /** Insert multiple rows at once */
          await transactionalEntityManager
            .getRepository(ChannelMember)
            .createQueryBuilder()
            .insert()
            .values(channelUsers)
            .execute();
        });

        return {
          approved: true,
        };
      } catch {
        return {
          errors: [unexpectedError('createDirectMessageChannel')],
        };
      }
    },
  },
};
