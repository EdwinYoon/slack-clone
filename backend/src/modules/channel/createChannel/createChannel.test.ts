import { Connection } from 'typeorm';
import * as faker from 'faker';
import {
  ormConnectionHandler,
  createChannel,
  createTeam,
} from '../../../utils';
import { Channel } from '../../../entity';
import {
  wrongTeamNameError,
  duplicateChannelNameError,
} from './createChannelError';

faker.seed(Date.now());
const coolTeamName = `${faker.name.findName()}-${faker.name.findName()}`;
const coolChannelName = `${faker.name.findName()}_${faker.name.findName()}`;

let conn: Connection;
beforeAll(async () => {
  conn = await ormConnectionHandler();
});
afterAll(async () => conn.close());

describe('Create Channel', () => {
  test('Expected to create a new Channel', async () => {
    /** Create a team to test channel operations */
    const testTeam = await createTeam(coolTeamName);
    expect(testTeam).toEqual({ createTeam: { approved: true, errors: null } });

    /** Create a channel, expected to be successful */
    const channel = await createChannel(coolChannelName, coolTeamName);

    expect(channel).toEqual({
      createChannel: { approved: true, errors: null },
    });

    const confirmChannel = await Channel.find({ name: coolChannelName });
    expect(confirmChannel).toHaveLength(1);
  });

  test('Expected to show WrongTeamNameError', async () => {
    /** Show Error if team name is not exist */
    const channel = await createChannel(
      `${coolChannelName}-another`,
      `${coolTeamName}-wrong`
    );

    expect(channel).toEqual({
      createChannel: { approved: null, errors: [wrongTeamNameError] },
    });
  });

  test('Expected to show duplicateChannelNameError', async () => {
    /** coolChannelName is used on previous test, so it should be an error */
    const anotherChannelCreation = await createChannel(
      coolChannelName,
      coolTeamName
    );

    expect(anotherChannelCreation).toEqual({
      createChannel: { approved: null, errors: [duplicateChannelNameError] },
    });
  });
});
