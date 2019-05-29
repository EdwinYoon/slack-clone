import * as bcrypt from 'bcryptjs';
import { ResolverMap } from './types/RevolserMap';
import { User } from './entity/User';

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    register: async (
      _,
      { email, password, username }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        username,
        password: hashedPassword,
      });
      await user.save();

      return true;
    },
  },
};
