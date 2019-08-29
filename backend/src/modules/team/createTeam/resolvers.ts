import { getManager } from 'typeorm';
import { Team, Channel } from '../../../entity';
import { ResolverMap, IContext } from '../../../types/customTypes';
import { duplicateTeamNameError } from './createTeamErrors';
import { unexpectedError } from '../../common/sharedError';

export const resolvers: ResolverMap = {
  Mutation: {
    createTeam: async (
      _,
      { name, isPublic }: GQL.ICreateTeamOnMutationArguments,
      { session }: IContext
    ) => {
      const duplicateTeamName = await Team.findOne({ where: { name } });

      /** Check if the name already exist, */
      if (duplicateTeamName) {
        return {
          errors: [duplicateTeamNameError],
        };
      }

      try {
        /**  If one of those create have failed, we rollback to before */
        await getManager().transaction(async transactionalEntityManager => {
          const newTeam = Team.create({ name, isPublic });
          await transactionalEntityManager.save(newTeam);

          const generalChannel = Channel.create({
            name: 'general',
            isPublic: true,
            team: newTeam,
          });
          await transactionalEntityManager.save(generalChannel);

          session.teamId = newTeam.id;
        });

        /** If everything went well, approve it  */
        return {
          approved: true,
        };
      } catch {
        return {
          errors: [unexpectedError('Create Team')],
        };
      }
    },
  },
};
