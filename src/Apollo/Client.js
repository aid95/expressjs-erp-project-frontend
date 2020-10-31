import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

const Client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "http://temp/",
  clientState: {
    defaults,
    resolvers,
  },
});

export default Client;
