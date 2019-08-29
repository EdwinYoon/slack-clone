import { Team } from '../../../entity';
import { ResolverMap } from '../../../types/customTypes';
import { noTeamError } from './signinWorkspaceError';

export const resolvers: ResolverMap = {
  Mutation: {
    signinWorkspace: async (
      _,
      { teamName }: GQL.ISigninWorkspaceOnMutationArguments,
      { session }
    ) => {
      const team = await Team.findOne({ where: { name: teamName } });

      console.log(team);

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
