import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new SchemaLink({ schema })
});


