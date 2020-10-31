import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <>
          <Routes isLoggedIn={false} />
        </>
      </Router>
    </ThemeProvider>
  );
}

export default App;
