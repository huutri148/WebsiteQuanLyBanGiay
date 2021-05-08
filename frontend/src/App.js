import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./screens/Home";
import "./App.css";
import QuanLySanPham from "./screens/QuanLySanPham";
import QuanLyGioHang from "./screens/QuanLyGioHang";
import QuanLyNguoiDung from "./screens/QuanLyNguoiDung";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/products">
              <QuanLySanPham />
            </Route>
            <Route exact path="/users">
              <QuanLyNguoiDung />
            </Route>
            <Route exact path="/carts">
              <QuanLyGioHang />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
