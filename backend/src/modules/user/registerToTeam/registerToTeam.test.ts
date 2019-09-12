import { Connection } from 'typeorm';
import * as faker from 'faker';
import { User } from '../../../entity';
import { ormConnectionHandler } from '../../../utils';
import { TestClient } from '../../../testUtils';
import { createTeam, registerToTeam } from '../../../testUtils';
import { authError } from '../../common/sharedError';
import { alreadyRegisteredUserError } from './registerToTeamErrors';

faker.seed(Date.now() + 5);
const failedTeamName = `${faker.fake.name}`;
const teamName = `${faker.name.firstName}`;
const email = faker.internet.email();
const password = faker.internet.password();
let client;

let conn: Connection;
beforeAll(async () => {
  conn = await ormConnectionHandler();
  client = new TestClient(process.env.TEST_HOST as string);
});
afterAll(() => conn.close());

describe('User Register to a team', () => {
  it('Expected to be failed to register user due to absence of session values', async () => {
    await createTeam(failedTeamName, true);
    const registerWithoutTeamId = await registerToTeam(email, password);

    /** must be failed, because it does not have the session values */
    expect(registerWithoutTeamId).toEqual({
      registerToTeam: {
        approved: null,
        errors: [authError],
      },
    });
  });

  it('Expected to register a user to a team', async () => {
    await client.createdTeam(
      teamName
    ); /** Create Team to signin. Also, required to get session.teamId */

    const response = await client.registerToTeam(email, password);
    expect(response.data).toEqual({
      registerToTeam: { approved: true, errors: null },
    });

    const user = await User.findOne({ where: { email } });

    if (user) {
      expect(user.email).toEqual(email);
      expect(user.password).not.toEqual(password);
    }
  });

  it('Expected to be failed to registerToTeam, because it is registered already', async () => {
    /**
     * It already has teamId session value at this point,
     * therefore, it must respond with errors if we try to register
     * again with the same user email
     */
    const registeredUser = await client.registerToTeam(email, password);

    expect(registeredUser.data).toEqual({
      registerToTeam: { approved: null, errors: [alreadyRegisteredUserError] },
    });
  });
});
