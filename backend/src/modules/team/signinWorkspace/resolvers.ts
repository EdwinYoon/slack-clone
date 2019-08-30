import { Team } from '../../../entity';
import { ResolverMap, IContext } from '../../../types/customTypes';
import { noTeamError } from './signinWorkspaceError';

export const resolvers: ResolverMap = {
  Mutation: {
    signinWorkspace: async (
      _,
      { teamName }: GQL.ISigninWorkspaceOnMutationArguments,
      { session }: IContext
    ) => {
      const team = await Team.findOne({ where: { name: teamName } });

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
