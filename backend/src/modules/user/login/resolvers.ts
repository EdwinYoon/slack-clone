import * as bcrypt from 'bcryptjs';
import { ResolverMap } from '../../../types/RevolserMap';
import { User } from '../../../entity';

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      // Get User from db
      const user = await User.findOne({ where: { email } });

      // If No user with the email
      if (!user) {
        return {
          errors: [
            {
              path: 'Login',
              message: 'Invalid email',
            },
          ],
        };
      }

      // Check password
      const passwordValidation = await bcrypt.compare(password, user.password);

      // if Invalid
      if (!passwordValidation) {
        return {
          errors: [
            {
              path: 'Login',
              message: 'Invalid Password',
            },
          ],
        };
      }

      return {
        approved: true,
      };
    },
  },
};
