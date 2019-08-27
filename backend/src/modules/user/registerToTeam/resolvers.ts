import { getManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ResolverMap } from '../../../types/RevolserMap';
import { User, TeamMember } from '../../../entity';
import { duplicateEmailError } from './registerErrors';

export const resolvers: ResolverMap = {
  Mutation: {
    registerToTeam: async (
      _,
      { email, password, teamId }: GQL.IRegisterToTeamOnMutationArguments
    ) => {
      // Check if the requested email exists
      const duplicateEmail = await User.findOne({ where: { email } });

      // If the email is registered already,
      if (duplicateEmail) {
        return {
          errors: [duplicateEmailError],
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        /**  If one of those create have failed, we rollback to before */

        await getManager().transaction(async transactionalEntityManager => {
          // Store user info to DB
          const user = User.create({
            email,
            password: hashedPassword,
          });
          await transactionalEntityManager.save(user);

          const teamMember = TeamMember.create({
            userId: user.id,
            teamId,
            username: user.email,
          });
          await transactionalEntityManager.save(teamMember);
        });

        /** If everything went well, approve it  */
        return {
          approved: true,
        };
      } catch {
        return {
          errors: [
            {
              path: 'Register to Team',
              message: 'something Went wrong',
            },
          ],
        };
      }
    },
  },
};
