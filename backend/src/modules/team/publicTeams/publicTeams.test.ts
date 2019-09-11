import { Connection } from 'typeorm';
import * as faker from 'faker';
import { ormConnectionHandler } from '../../../utils';
import { createTeam, publicTeams } from '../../../testUtils';
import { Team } from '../../../entity';
import { unexpectedError } from '../../common/sharedError';

faker.seed(Date.now() + 5);
const publicTeamName = `${faker.name.findName()}-${faker.name.findName()}`;
const privateTeamName = `${faker.name.findName()}-${faker.name.findName()}`;

let conn: Connection;
beforeAll(async () => {
  conn = await ormConnectionHandler();
});
afterAll(async () => conn.close());

describe('Public Team Query', () => {
  test('Expected to return errors when there is no public team', async () => {
    /**
     *  If there is no public team, that must be something wrong
     *  therefore, It must return an unexpectedError
     */
    const publicTeamsQuery = await publicTeams();

    /** Expected */
    expect(publicTeamsQuery).toEqual({
      publicTeams: { teams: null, errors: [unexpectedError('publicTeams')] },
    });
  });

  test('Expected to create one public and one private team', async () => {
    /** Create new teams */
    const publicTeam = await createTeam(publicTeamName, true);
    const privateTeam = await createTeam(privateTeamName, false);

    /** It should be able to create teams */
    expect(publicTeam).toEqual({
      createTeam: { approved: true, errors: null },
    });
    expect(privateTeam).toEqual({
      createTeam: { approved: true, errors: null },
    });

    /** Expected to have one public and one private records */
    const teams = await Team.find();
    expect(teams).toHaveLength(2);

    /** The private teamName should match */
    const thePrivate = teams.filter(({ isPublic }) => !isPublic)[0];
    expect(thePrivate.name).toEqual(privateTeamName);

    /** The public teamName should match */
    const thePublic = teams.filter(({ isPublic }) => isPublic)[0];
    expect(thePublic.name).toEqual(publicTeamName);
  });

  test('Expected to include only the public team on query response', async () => {
    /** Now, we have one public and one private,
     *  the query result must include only the public one.
     */
    const teams = await Team.find();
    expect(teams).toHaveLength(2);

    const thePublicTeam = teams.filter(
      ({ isPublic }) => isPublic
    ); /** Expected output */

    const onlyPublic = await publicTeams(); /** The query result */

    expect(onlyPublic).toEqual({
      publicTeams: {
        teams: thePublicTeam,
        errors: null,
      },
    });
  });
});
