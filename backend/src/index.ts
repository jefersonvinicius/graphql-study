import database from './database';
import { createHTTPServer } from './http-server';

async function bootstrap() {
  await database.initialize();
  const { httpServer, graphql } = await createHTTPServer();
  httpServer.listen(3333, () => {
    console.log('Serving at http://localhost:3333');
    console.log(`GraphQL path: ${graphql.graphqlPath}`);
  });
}

bootstrap();
