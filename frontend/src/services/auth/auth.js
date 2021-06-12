import React from "react";
import { isAuthenticated } from "../jwtAuthService";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setUser } from "../../redux/actions/nguoiDungAction";
import { useDispatch, useSelector } from "react-redux";
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User);
  const { userInfo, isSet } = user;
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = isAuthenticated();

        // Just for purpose of development
        // Need to use Refresh token when access token expired
        if (token && typeof isSet === "undefined") {
          const access = localStorage.getItem("access_token");
          var decode2 = jwt_decode(access);
          dispatch(setUser(decode2.data));
        }

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
};
