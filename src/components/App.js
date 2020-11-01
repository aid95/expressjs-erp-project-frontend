import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { HelmetProvider } from "react-helmet-async";
import { HashRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Footer from "./Footer";
import Routes from "./Routes";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
`;

const MainWrapper = styled.main`
  margin: 0 auto;
  max-width: ${(props) => props.theme.contentMaxWidth};
  width: 100%;
  height: 100%;
`;

const FooterWrapper = styled.footer`
  margin: 0 auto;
  max-width: ${(props) => props.theme.footerMaxWidth};
  width: 100%;
`;

function App() {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <HelmetProvider>
        <GlobalStyles />
        <Router>
          <>
            <SectionWrapper>
              <MainWrapper>
                <Routes isLoggedIn={isLoggedIn} />
              </MainWrapper>
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
            </SectionWrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
