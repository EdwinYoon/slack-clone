import { Team } from '../../../entity';
import { ResolverMap } from '../../../types/RevolserMap';
import { noTeamError } from './getTeamByNameError';

export const resolvers: ResolverMap = {
  Query: {
    getTeamByName: async (
      _,
      { name }: GQL.IGetTeamByNameOnQueryArguments,
      { req }
    ) => {
      const team = await Team.findOne({ where: { name } });

      if (!team) {
        return {
          errors: [noTeamError],
        };
      }

      req.session.teamId = team.id;
      return team;
    },
  },
};
