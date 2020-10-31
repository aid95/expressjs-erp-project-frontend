import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import ReactDOM from "react-dom";
import Client from "./Apollo/Client";
import App from "./Components/App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
