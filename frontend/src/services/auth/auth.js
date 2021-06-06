import React from "react";
import { isAuthenticated } from "../jwtAuthService";
import AuthenticateBeforeRender from "./AuthBeforeRender";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = isAuthenticated();
      console.log(token);
      return token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }}
  />
);
