import { Connection } from 'typeorm';
import * as faker from 'faker';
import { ormConnectionHandler } from '../../../utils';
import { invalidEmailError, invalidPasswordError } from './loginErrors';
import { TestClient } from '../../../testUtils';

faker.seed(Date.now() + 5);
const teamName = faker.name.firstName();
const email = faker.internet.email();
const password = faker.internet.password();

const client = new TestClient(process.env.TEST_HOST as string);
let conn: Connection;

jest.setTimeout(5 * 60 * 1000);

describe('User Login', () => {
  beforeAll(async () => {
    console.log('called');
    conn = await ormConnectionHandler();
    console.log('after called');
  });
  test('Expected a user to login successfully.', async () => {
    /** pre-required to have session.teamId */
    console.log('-----connection--------');
    console.log(conn);
    console.log('-----connection--------');

    /** Another client for testing purpose. */
    const clientTwo = new TestClient(process.env.TEST_HOST as string);
    await clientTwo.createTeam(teamName);
    await clientTwo.registerToTeam(email, password);

    await client.signinWorkspace(teamName);
    const loginRes = await client.login(email, password);

    expect(loginRes.data).toEqual({ login: { approved: true, errors: null } });
  });

  test('Expected invalid email error response.', async () => {
    const badEmail = `${email}${faker.random.number}`;
    const response = await client.login(badEmail, password);

    expect(response.data).toEqual({
      login: { approved: null, errors: [invalidEmailError] },
    });
  });

  test('Expected invalid password error', async () => {
    const badPassword = `${password}${faker.random.word}`;
    const response = await client.login(email, badPassword);

    expect(response.data).toEqual({
      login: { approved: null, errors: [invalidPasswordError] },
    });
  });
  afterAll(async () => conn.close());
});
