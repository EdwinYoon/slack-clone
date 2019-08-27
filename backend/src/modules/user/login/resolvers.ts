import * as bcrypt from 'bcryptjs';
import { ResolverMap } from '../../../types/RevolserMap';
import { User, TeamMember } from '../../../entity';
import {
  invalidEmailError,
  invalidPasswordError,
  notAMemberError,
} from './loginErrors';

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      { email, password, teamId }: GQL.ILoginOnMutationArguments,
      { req }
    ) => {
      // Get User from db
      const user = await User.findOne({
        select: ['id', 'email', 'password'],
        where: { email },
      });

      // If No user with the email
      if (!user) {
        return {
          errors: [invalidEmailError],
        };
      }

      // Check password
      const passwordValidation = await bcrypt.compare(password, user.password);

      // if Invalid
      if (!passwordValidation) {
        return {
          errors: [invalidPasswordError],
        };
      }

      const teamMember = TeamMember.findOne({
        where: { userId: user.id, teamId },
      });

      if (!teamMember) {
        return {
          errors: [notAMemberError],
        };
      }

      req.session.userId = user.id;

      return {
        approved: true,
        user: {
          id: user.id,
          email: user.email,
        },
      };
    },
  },
};
