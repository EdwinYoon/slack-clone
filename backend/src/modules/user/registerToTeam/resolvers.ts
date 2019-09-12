import { getManager } from 'typeorm';
import { ResolverMap, IContext } from '../../../types/customTypes';
import { User, TeamMember, ChannelMember, Channel } from '../../../entity';
import { alreadyRegisteredUserError } from './registerToTeamErrors';
import { unexpectedError } from '../../common/sharedError';

export const resolvers: ResolverMap = {
  Mutation: {
    registerToTeam: async (
      _,
      { email, password }: GQL.IRegisterToTeamOnMutationArguments,
      { session }: IContext
    ) => {
      /** Check if the given email is already registered */
      const isRegistered = await TeamMember.createQueryBuilder('teamMember')
        .innerJoin('teamMember.user', 'user')
        .where('teamMember.teamId = :id', { id: session.teamId })
        .andWhere('user.email = :email', { email })
        .getOne();

      // If the email is taken already,
      if (isRegistered) {
        return {
          errors: [alreadyRegisteredUserError],
        };
      }

      try {
        /**  If one of those creates failed, rollback to before */

        return await getManager().transaction(
          async transactionalEntityManager => {
            // Store user info to DB
            const user = User.create({
              email,
              password,
            });
            await transactionalEntityManager.save(user);

            /** Assign user as team member */
            const teamMember = TeamMember.create({
              userId: user.id,
              teamId: session.teamId,
              username: user.email,
            });
            await transactionalEntityManager.save(teamMember);

            const genenralChannel = await Channel.findOne({
              where: { name: 'general' },
            });

            if (!genenralChannel) {
              return {
                errors: [unexpectedError('registerToTeam')],
              };
            }

            /** Assign user the default channel */
            const newChannelMember = await ChannelMember.create({
              userId: user.id,
              channelId: genenralChannel.id,
            });

            await transactionalEntityManager.save(newChannelMember);

            /** If everything went well, approve it  */
            return {
              approved: true,
            };
          }
        );
      } catch {
        return {
          errors: [unexpectedError('registerToTeam')],
        };
      }
    },
  },
};
