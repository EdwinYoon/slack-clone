import { Team } from '../../../entity';
import { ResolverMap } from '../../../types/RevolserMap';
import { noTeamError } from './signinWorkspaceError';

export const resolvers: ResolverMap = {
  Mutation: {
    signinWorkspace: async (
      _,
      { name }: GQL.ISigninWorkspaceOnMutationArguments,
      { session }
    ) => {
      const team = await Team.findOne({ where: { name } });

      if (!team) {
        return {
          errors: [noTeamError],
        };
      }

      session.teamId = team.id;

      return {
        team,
      };
    },
  },
};
