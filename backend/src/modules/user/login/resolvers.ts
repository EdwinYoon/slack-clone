import * as bcrypt from 'bcryptjs';
import { ResolverMap } from '../../../types/RevolserMap';
import { User } from '../../../entity';
import { invalidEmailError, invalidPasswordError } from './loginErrors';

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      // Get User from db
      const user = await User.findOne({ where: { email } });

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

      return {
        approved: true,
      };
    },
  },
};
