import { getManager } from 'typeorm';
import { Team, Channel } from '../../../entity';
import { ResolverMap } from '../../../types/RevolserMap';
import { duplicateTeamNameError } from './createTeamErrors';

export const resolvers: ResolverMap = {
  Mutation: {
    createTeam: async (_, { name }: GQL.ICreateTeamOnMutationArguments) => {
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
          const newTeam = Team.create({ name });
          await transactionalEntityManager.save(newTeam);

          const generalChannel = Channel.create({
            name: 'general',
            isPublic: true,
            team: newTeam,
          });
          await transactionalEntityManager.save(generalChannel);
        });

        /** If everything went well, approve it  */
        return {
          approved: true,
        };
      } catch {
        return {
          errors: [
            {
              path: 'Create Team',
              message: 'something Went wrong',
            },
          ],
        };
      }
    },
  },
};
