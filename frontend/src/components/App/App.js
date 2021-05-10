import { Route, BrowserRouter as Router, Switch , Redirect} from "react-router-dom";
import Manager from '../../screens/Manager'
import Login from '../../components/Login/Login'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch >
          <Route path="/manager" render = {() => {
            return localStorage.getItem("accessToken") ? <Manager /> : <Redirect to="/" /> }} />
          <Route path = "/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
