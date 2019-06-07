import { Connection } from 'typeorm';
import * as faker from 'faker';
import { ormConnectionHandler } from '../../../utils';
import { invalidEmailError, invalidPasswordError } from './loginErrors';
import { register, login } from '../../../utils';

faker.seed(Date.now() + 5);
const email = faker.internet.email();
const password = faker.internet.password();
const username = faker.name.findName();

let conn: Connection;
beforeAll(async () => {
  conn = await ormConnectionHandler();
});
afterAll(() => conn.close());

describe('User Login', () => {
  test('Expected a user to login successfully.', async () => {
    await register(email, password, username);
    const loginRes = await login(email, password);

    expect(loginRes).toEqual({ login: { approved: true, errors: null } });
  });

  test('Expected invalid email error', async () => {
    await register(email, password, username);
    const badEmail = `11${email}`;
    const response = await login(badEmail, password);

    expect(response).toEqual({
      login: { approved: null, errors: [invalidEmailError] },
    });
  });

  test('Expected invalid password error', async () => {
    await register(email, password, username);
    const badPassword = `11${password}`;
    const response = await login(email, badPassword);

    expect(response).toEqual({
      login: { approved: null, errors: [invalidPasswordError] },
    });
  });
});
