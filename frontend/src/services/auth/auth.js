import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../jwtAuthService";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setUser } from "../../redux/actions/nguoiDungAction";
import { useDispatch, useSelector } from "react-redux";
export const PrivateRoute = ({ component: Component, Role, ...rest }) => {
  const dispatch = useDispatch();
  const { isSet, userInfo } = useSelector((state) => state.User);
  const { listPhanQuyen } = useSelector((state) => state.ListPhanQuyen);
  const [isMatchedRole, setIsMatchedRole] = useState(false);
  const isAuth = isAuthenticated();

  if (isAuth) {
    const access = localStorage.getItem("access_token");
    var decode2 = jwt_decode(access);
    if (typeof isSet === "undefined") {
      dispatch(setUser(decode2.data));
    }
  }

  useEffect(() => {
    if (listPhanQuyen.length > 0) {
      const matchRole = listPhanQuyen.includes(Role);

      if (matchRole) {
        //console.log(matchRole);
        setIsMatchedRole(matchRole);
      }
    }
  }, [listPhanQuyen, Role, userInfo]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? (
          isMatchedRole ? (
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
