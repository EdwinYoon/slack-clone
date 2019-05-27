import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { GraphQLServer } from 'graphql-yoga';
import { ResolverMap } from './types/RevolserMap';
// import { User } from './entity/User';

const typeDefs = `
      type Query {
        hello(name: String): String!
      }
    `;

const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

createConnection()
  .then(() => {
    const server = new GraphQLServer({ typeDefs, resolvers });
    server.start(() => console.log('Server is running on localhost:4000'));
  })
  .catch(error => console.log(error));
