import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import Auth from "../Routes/Auth";
import Monitor from "../Routes/Monitor";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Monitor} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
