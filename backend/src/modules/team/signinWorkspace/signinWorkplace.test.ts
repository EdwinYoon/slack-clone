import { Connection } from 'typeorm';
import * as faker from 'faker';
import { ormConnectionHandler } from '../../../utils';
import { createTeam, signinWorkspace } from '../../../testUtils';
import { Team } from '../../../entity';
import { noTeamError } from './signinWorkspaceError';

faker.seed(Date.now() + 5);
const coolTeamName = `${faker.name.findName()}-${faker.name.findName()}`;

let conn: Connection;
beforeAll(async () => {
  conn = await ormConnectionHandler();
});
afterAll(async () => {
  conn.close();
});

describe('Create Team', () => {
  test('Expected to create a new team to signin', async () => {
    /** Create a new team */
    const newTeam = await createTeam(coolTeamName, true);

    /** expected response */
    expect(newTeam).toEqual({ createTeam: { approved: true, errors: null } });

    /** Expected to have one record */
    const team = await Team.find({ where: { name: coolTeamName } });
    expect(team).toHaveLength(1);
  });

  test('Expected to successfully signin to a team', async () => {
    const signin = await signinWorkspace(coolTeamName);
    const signinTeam = await Team.findOne({ where: { name: coolTeamName } });

    expect(signin).toEqual({
      signinWorkspace: {
        team: signinTeam,
        errors: null,
      },
    });
  });

  test('Expected to be failed to signinWorkspace with wrong teamName', async () => {
    const wrongName = faker.internet.email();
    const signinWithWrongName = await signinWorkspace(wrongName);

    expect(signinWithWrongName).toEqual({
      signinWorkspace: {
        errors: [noTeamError],
        team: null,
      },
    });
  });
});
