import { Connection } from 'typeorm';
import * as faker from 'faker';
import { ormConnectionHandler, createTeam } from '../../../utils';
import { Team } from '../../../entity';
import { duplicateTeamNameError } from './createTeamErrors';

faker.seed(Date.now() + 5);
const coolTeamName = `${faker.name.findName()}-${faker.name.findName()}`;

let conn: Connection;
beforeAll(async () => {
  conn = await ormConnectionHandler();
});
afterAll(async () => conn.close());

describe('Create Team', () => {
  test('Expected to create a new team', async () => {
    /** Create a new team */
    const newTeam = await createTeam(coolTeamName, true);

    /** expected response */
    expect(newTeam).toEqual({ createTeam: { approved: true, errors: null } });

    /** Expected to have one record */
    const team = await Team.find({ where: { name: coolTeamName } });
    expect(team).toHaveLength(1);
  });
  test('Expected to check duplicate team name', async () => {
    /** Duplicate name which created once */
    const duplicateNameTeamCreation = await createTeam(coolTeamName, true);

    /** Expected */
    expect(duplicateNameTeamCreation).toEqual({
      createTeam: { approved: null, errors: [duplicateTeamNameError] },
    });
  });
});
