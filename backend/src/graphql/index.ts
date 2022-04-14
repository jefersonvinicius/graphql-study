import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { Server } from 'http';
import { readFileSync } from 'fs';

const resolvers = {
  Author: {
    name: () => 'world',
  },
};

const typeDefs = readFileSync(__dirname + '/schema.graphql').toString();

export function createGraphQLServer(httpServer: Server) {
  return new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
}
