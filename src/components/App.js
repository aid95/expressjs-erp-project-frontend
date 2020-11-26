import { HelmetProvider } from "react-helmet-async";
import { HashRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Footer from "./Footer";
import Header from "./Header";
import Routes from "./Routes";
import { isLoggedIn } from "../utils";

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

const MainWrapper = styled.main`
  margin: 0 auto;
  max-width: ${(props) => props.theme.contentMaxWidth};
  width: 100%;
  height: 100%;
  min-height: 80vh;
`;

const FooterWrapper = styled.footer`
  margin: 0 auto;
  max-width: ${(props) => props.theme.footerMaxWidth};
  width: 100%;
`;

function App() {
  const isLoggedInFlag = isLoggedIn();

  return (
    <ThemeProvider theme={Theme}>
      <HelmetProvider>
        <GlobalStyles />
        <Router>
          <>
            <SectionWrapper>
              {isLoggedInFlag && <Header />}
              <MainWrapper>
                <Routes isLoggedIn={isLoggedInFlag} />
              </MainWrapper>
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
            </SectionWrapper>
          </>
        </Router>
        <ToastContainer
          position={toast.POSITION.BOTTOM_RIGHT}
          autoClose={2500}
          hideProgressBar={true}
        />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
