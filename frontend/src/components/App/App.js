import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Manager from "../../screens/Manager";
import Login from "../../components/Login/Login";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/manager">
              <Manager />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
