import { ResolverMap, IContext } from '../../../types/customTypes';
import { Team, TeamMember } from '../../../entity';
import { unexpectedError } from '../../common/sharedError';
import { invalidTeamError } from '../../common/sharedError';

export const resolvers: ResolverMap = {
  Query: {
    getUsersByTeam: async (_, __, { session }: IContext) => {
      // try {
      const { teamId } = session;
      const isTeamValid = await Team.findOne({ where: { id: teamId } });

      if (!isTeamValid) {
        return {
          errors: [invalidTeamError('getUsersByTeam')],
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
      // } catch {
      //   return {
      //     errors: [unexpectedError('getUsersByTeam')],
      //   };
      // }
    },
  },
};
