import { ResolverMap } from '../../../types/RevolserMap';
import { Team, TeamMember } from '../../../entity';
import { unexpectedError } from '../../common/unexpectedError';
import { invalidTeamError } from './getUsersByTeamError';

export const resolvers: ResolverMap = {
  Query: {
    getUsersByTeam: async (
      _,
      { teamId }: GQL.IGetUsersByTeamOnQueryArguments
    ) => {
      try {
        const isTeamValid = await Team.findOne({ where: { id: teamId } });

        if (!isTeamValid) {
          return {
            errors: [invalidTeamError],
          };
        }

        const members = await TeamMember.find({ where: { teamId } });

        if (!members) {
          return {
            errors: [unexpectedError('getUsersByTeam')],
          };
        }

        return {
          users: members,
        };
      } catch {
        return {
          errors: [unexpectedError('getTeamByName')],
        };
      }
    },
  },
};
