import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { history } from "../../helper/history";
import "./App.css";
import configureStore from "../../redux/configureStore";
import { PrivateRoute } from "../../services/auth/auth";
import routes from "../../screens/RootRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      // clear alert on location change
    });
  }

  render() {
    return (
      <Provider store={store}>
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
        </div>
        <ToastContainer autoClose={2000} />
      </Provider>
    );
  }
}

export default App;
