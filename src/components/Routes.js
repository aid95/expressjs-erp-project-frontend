import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Auth from "../Routes/Auth";
import Monitor from "../Routes/Monitor";
import Profile from "../Routes/Profile";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Monitor} />
    <Route path="/:username" component={Profile} />
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
