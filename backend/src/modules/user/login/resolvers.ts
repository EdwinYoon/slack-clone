import * as bcrypt from 'bcryptjs';
import { ResolverMap } from '../../../types/RevolserMap';
import { User } from '../../../entity';
import { invalidEmailError, invalidPasswordError } from './loginErrors';
import { generateTokens } from '../../../utils';

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { res }
    ) => {
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

      const { refreshToken, accessToken } = generateTokens(user);

      res.cookie('refresh-token', refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      res.cookie('access-token', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 30),
      });

      return {
        approved: true,
        token: accessToken,
        refreshToken,
      };
    },
  },
};
