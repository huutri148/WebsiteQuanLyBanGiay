import React from "react";
import { isAuthenticated } from "../jwtAuthService";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setUser } from "../../redux/actions/nguoiDungAction";
import { useDispatch, useSelector } from "react-redux";
import { authRoles } from "./authRoles";
export const PrivateRoute = ({ component: Component, Role, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User);
  const { isSet } = user;
  return (
    <Route
      {...rest}
      render={(props) => {
        const isAuth = isAuthenticated();
        var isMatchRole = false;

        // Just for purpose of development
        // Need to use Refresh token when access token expired
        if (isAuth) {
          const access = localStorage.getItem("access_token");
          var decode2 = jwt_decode(access);
          isMatchRole = authRoles[Role].includes(decode2.data.MaChucVu);
          if (typeof isSet === "undefined") dispatch(setUser(decode2.data));
        }

        return isAuth ? (
          isMatchRole ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/session/404", state: { from: props.location } }}
            />
          )
        ) : (
          <Redirect
            to={{ pathname: "/admin/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};
