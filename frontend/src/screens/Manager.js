import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "./Home";
import "../components/App/App.css";
import QuanLySanPham from "./QuanLySanPham/QuanLySanPham";
import QuanLyGioHang from "./QuanLyGioHang";
import QuanLyNguoiDung from "./QuanLyNguoiDung";
import QuanLyNhaCungCap from "./QuanLyNhaCungCap/QuanLyNhaCungCap";
import QuanLyHangSanXuat from "./QuanLyHangSanXuat/QuanLyHangSanXuat";
import QuanLyBanHang from "./QuanLyBanHang/QuanLyBanHang";
import { PrivateRoute } from "../services/auth/auth";

export const Manager = withRouter(() => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute exact path="/products">
            <QuanLySanPham />
          </PrivateRoute>
          <Route exact path="/users">
            <QuanLyNguoiDung />
          </Route>
          <Route exact path="/carts">
            <QuanLyGioHang />
          </Route>
          <Route exact path="/suppliers">
            <QuanLyNhaCungCap />
          </Route>
          <Route exact path="/brands">
            <QuanLyHangSanXuat />
          </Route>
          <Route exact path="/bills">
            <QuanLyBanHang />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
});
