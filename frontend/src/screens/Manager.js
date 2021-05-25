import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Layout } from "../components/Layout";
import Home from "./Home";
import "../components/App/App.css";
import QuanLySanPham from "./QuanLySanPham";
import QuanLyGioHang from "./QuanLyGioHang";
import QuanLyNguoiDung from "./QuanLyNguoiDung";
import QuanLyHangSanXuat from "./QuanLyHangSanXuat/QuanLyHangSanXuat";

import QuanLyBanHang from "./QuanLyBanHang/QuanLyBanHang";

export default function Manager() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/products">
            <QuanLyHangSanXuat />
          </Route>
          <Route exact path="/users">
            <QuanLyNguoiDung />
          </Route>
          <Route exact path="/carts">
            <QuanLyGioHang />
          </Route>
          <Route exact path="/bills">
            <QuanLyBanHang />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
