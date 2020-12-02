import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Auth from "../Routes/Auth";
import Profile from "../Routes/Profile";
import Dashboard from "../Routes/Dashboard";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Profile} />
    <Route path="/:username" component={Dashboard} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
