import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://c0fb-175-211-151-17.ngrok.io/graphql",
  // uri: "http://0.0.0.0:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
