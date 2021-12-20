import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://pretty-dog-64.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
