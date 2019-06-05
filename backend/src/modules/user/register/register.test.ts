import { Connection } from 'typeorm';
import * as faker from 'faker';
import { User } from '../../../entity';
import { ormConnectionHandler, register } from '../../../utils';
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
  await conn.close();
});

describe('User Registration', () => {
  it('Expect to register a user', async () => {
    const response = await register(email, password, username);
    expect(response).toEqual({ register: { approved: true, errors: null } });

    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);

    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  it('Expect to check duplicate email', async () => {
    const duplicateEmailResponse = await register(email, password, username);

    expect(duplicateEmailResponse).toEqual({
      register: { approved: null, errors: [duplicateEmailError] },
    });
  });
});
