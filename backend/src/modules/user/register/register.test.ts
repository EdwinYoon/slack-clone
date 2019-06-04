import { Connection } from 'typeorm';
import * as faker from 'faker';
import { request } from 'graphql-request';
import { User } from '../../../entity';
import { ormConnectionHandler } from '../../../utils';
import { duplicateEmailError } from './registerErrors';

faker.seed(Date.now() + 5);
const email = faker.internet.email();
const password = faker.internet.password();
const username = faker.name.findName();

let conn: Connection;
beforeAll(async () => {
  conn = await ormConnectionHandler();
});
afterAll(async () => {
  conn.close();
});

const registerMutation = (e: string, p: string, u: string) => `
  mutation {
    register(email: "${e}", password: "${p}", username: "${u}" ) {
      approved
      errors {
        path
        message 
      }
  }
}`;

const testHost = process.env.TEST_HOST as string;

describe('User Registration', async () => {
  it('Expect to register a user', async () => {
    const response = await request(
      testHost,
      registerMutation(email, password, username)
    );

    expect(response).toEqual({ register: { approved: true, errors: null } });

    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);

    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  it('Expect to check duplicate email', async () => {
    const duplicateEmailResponse = await request(
      testHost,
      registerMutation(email, password, username)
    );

    expect(duplicateEmailResponse).toEqual({
      register: { approved: null, errors: [duplicateEmailError] },
    });
  });
});
