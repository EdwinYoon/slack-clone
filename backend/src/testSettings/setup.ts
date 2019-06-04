import InitializeServer from '../InitializeServer';
import { AddressInfo } from 'net';

export const setup = async () => {
  const app = await InitializeServer();
  const { port } = app.address() as AddressInfo;
  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
};
