import { ResolverMap } from '../../../types/RevolserMap';
import { Team } from '../../../entity';
import { unexpectedError } from '../../common/sharedError';

export const resolvers: ResolverMap = {
  Query: {
    publicTeams: async () => {
      const publicTeams = await Team.find({ where: { isPublic: true } });

      if (!publicTeams) {
        return {
          errors: [unexpectedError('publicTeams')],
        };
      }

      return {
        teams: publicTeams,
      };
    },
  },
};
