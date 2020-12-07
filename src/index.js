import "./env";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";
import Client from "./Apollo/Client";
import App from "./Components/App";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <>
    <ApolloProvider client={Client}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ApolloProvider>
  </>,
  document.getElementById("root")
);
