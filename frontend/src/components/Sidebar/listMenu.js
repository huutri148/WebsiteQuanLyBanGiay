import React from "react";
import { ListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import FolderIcon from "@material-ui/icons/Folder";
import MoneyIcon from "@material-ui/icons/Money";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
export const mainListItems = (
  <div>
    <ListSubheader style={{ marginRight: 60 }} inset>
      Quản lý
    </ListSubheader>

    <ListItem button component={Link} to="/admin/products">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Sản Phẩm" />
    </ListItem>
    <ListItem button component={Link} to="/admin/bills">
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Bán Hàng" />
    </ListItem>
    <ListItem button component={Link} to="/admin/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Người Dùng" />
    </ListItem>
    <ListItem button component={Link} to="/admin/suppliers">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Nhà Cung Cấp" />
    </ListItem>
    <ListItem button component={Link} to="/admin/orders">
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="Đặt hàng" />
    </ListItem>
    <ListItem button component={Link} to="/admin/recdockets">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Nhập Kho" />
    </ListItem>
    <ListItem button component={Link} to="/admin/carts">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Giỏ Hàng" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader style={{ marginRight: 60 }} inset>
      Báo cáo
    </ListSubheader>
    <ListItem button component={Link} to="/admin/products">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Lợi nhuận" />
    </ListItem>
    <ListItem button component={Link} to="/admin/products">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Tồn kho" />
    </ListItem>
    <ListItem button component={Link} to="/admin/products">
      <ListItemIcon>
        <MoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Bán hàng" />
    </ListItem>
  </div>
);
