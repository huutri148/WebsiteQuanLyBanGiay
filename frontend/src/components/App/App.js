import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { history } from "../../helper/history";
import "./App.css";
import { PrivateRoute } from "../../services/auth/auth";
import routes from "../../screens/RootRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = (props) => {
  history.listen((location, action) => {
    // clear alert on location change
  });
  return (
    <div className="App">
      <Router history={history}>
        {routes.map((route, index) => {
          return route.private ? (
            <PrivateRoute
              exact
              path={route.path}
              component={route.component}
              Role={route.role}
            />
          ) : (
            <Route exact path={route.path} component={route.component} />
          );
        })}
      </Router>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
