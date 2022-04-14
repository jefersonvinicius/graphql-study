import app from './app';
import http from 'http';
import { createGraphQLServer } from './graphql';

export async function createHTTPServer() {
  const httpServer = http.createServer(app);
  const graphql = createGraphQLServer(httpServer);
  await graphql.start();
  graphql.applyMiddleware({ app });
  return { httpServer, graphql };
}
