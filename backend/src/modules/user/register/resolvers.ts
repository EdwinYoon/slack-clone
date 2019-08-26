import * as bcrypt from 'bcryptjs';
import { ResolverMap } from '../../../types/RevolserMap';
import { User } from '../../../entity';
import { duplicateEmailError } from './registerErrors';

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
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

      // Store user info to DB
      const user = User.create({
        email,
        password: hashedPassword,
      });
      await user.save();

      return {
        approved: true,
      };
    },
  },
};
