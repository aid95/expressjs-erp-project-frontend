import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <>
          <Routes isLoggedIn={isLoggedIn} />
        </>
      </Router>
    </ThemeProvider>
  );
}

export default App;
