import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import React from "react";
import { Manager } from "../../screens/Manager";
import { Login } from "../../screens/Login/Login";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";
import { history } from "../../helper/history";
import { PrivateRoute } from "../../services/auth/auth";

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
            <PrivateRoute exact path="/" component={Manager} />
            <Route path="/login" component={Login} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
