import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./utils/auth";

import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated()
        ? (<Component {...props}/>)
        : (<Redirect to={{ pathname: "/", state: { from: props.location }}}/>)
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props => 
    isAuthenticated()
      ? (<Redirect to={{ pathname: "/dashboard", state: { from: props.location }}}/>)
      : (<Component {...props}/>)
  }
/>
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <LoginRoute exact path="/" component={Login}/>

      <LoginRoute path="/admin" component={LoginAdmin}/>

      <LoginRoute path="/register" component={Register}/>

      <PrivateRoute path="/dashboard" component={Dashboard}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;