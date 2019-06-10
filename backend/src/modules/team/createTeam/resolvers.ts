import { Team } from '../../../entity';
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

      /** Otherwise, create a new team */
      const newTeam = Team.create({ name });
      await newTeam.save();

      return {
        approved: true,
      };
    },
  },
};
