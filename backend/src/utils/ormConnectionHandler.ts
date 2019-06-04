import { getConnectionOptions, createConnection } from 'typeorm';

const ormConnectionHandler = async () => {
  const options = await getConnectionOptions(process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'test') {
    return createConnection({
      ...options,
      name: 'default',
      synchronize: true,
      dropSchema: true,
    });
  }

  return createConnection({ ...options, name: 'default' });
};

export default ormConnectionHandler;
