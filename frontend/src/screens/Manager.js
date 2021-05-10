import React from 'react';
import { Route, BrowserRouter as Router, Switch , Redirect} from "react-router-dom";
import { Layout } from "../components/Layout";
import Home from "./Home";
import "../components/App/App.css";
import QuanLySanPham from "./QuanLySanPham";
import QuanLyGioHang from "./QuanLyGioHang";
import QuanLyNguoiDung from "./QuanLyNguoiDung";
import { render } from 'react-dom';


export default function Manager(){
    return (        
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
      </Router>)
}