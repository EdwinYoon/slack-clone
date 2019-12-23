import { Connection } from 'typeorm';
import * as faker from 'faker';
import { ormConnectionHandler } from '../../../utils';
import { TestClient } from '../../../testUtils';
import { Channel } from '../../../entity';
import { duplicateChannelNameError } from './createChannelError';

faker.seed(Date.now());
const teamName = `${faker.name.findName()}-${faker.name.findName()}`;
const coolChannelName = `${faker.name.findName()}_${faker.name.findName()}`;
const email = `${faker.internet.email}`;
const password = `${faker.internet.password}`;
const client = new TestClient(process.env.TEST_HOST as string);

let conn: Connection;
describe('Create Channel', () => {
  beforeAll(async () => {
    conn = await ormConnectionHandler();
  });

  test('Expected to create a new Channel', async () => {
    /** Create a team to test channel operations */
    await client.createTeam(teamName);
    await client.signinWorkspace(teamName);
    await client.registerToTeam(email, password);

    /** Create a channel, expected to be successful */
    const channel = await client.createChannel(coolChannelName, true);

    expect(channel.data).toEqual({
      createChannel: { approved: true, errors: null },
    });

    const confirmChannel = await Channel.findOne({ name: coolChannelName });

    expect(confirmChannel).toMatchObject({
      name: coolChannelName,
      isPublic: true,
      channelType: 'normal',
    });
  });

  test('Expected to show duplicateChannelNameError', async () => {
    /** coolChannelName is used on previous test, so it should be an error */
    const anotherChannelCreation = await client.createChannel(
      coolChannelName,
      true
    );

    expect(anotherChannelCreation.data).toEqual({
      createChannel: { approved: null, errors: [duplicateChannelNameError] },
    });
  });

  afterAll(async () => {
    conn.close();
  });
});
