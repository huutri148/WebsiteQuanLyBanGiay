import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Avatar,
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/nguoiDungAction";
import * as role from "../constants/authRoleConstant";

import { withRouter } from "react-router-dom";
import {
  ChevronLeft,
  Home,
  Person,
  Payment,
  Settings,
  Dvr,
  ExitToApp,
} from "@material-ui/icons";
import { StyledMenu } from "./TMenu";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import FolderIcon from "@material-ui/icons/Folder";
import MoneyIcon from "@material-ui/icons/Money";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#2E3B55",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  ShopLogo: {
    width: 90,
    height: theme.spacing(7),
    marginRight: 35,
  },
  name: {
    fontSize: "0.875rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  avatar: {
    margin: "0px 30px 0px 10px",
  },
  menu: {},
  container: {},
  appBarSpacer: theme.mixins.toolbar,
}));
export const Layout = withRouter((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userLogin = useSelector((state) => state.User);
  const { listPhanQuyen } = useSelector((state) => state.ListPhanQuyen);
  const { userInfo } = userLogin;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
    window.location.reload(false);
  };
  const handleHome = () => {
    props.history.push("/");
    window.location.reload(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <div>
                <img
                  src="/images/logo2.png"
                  style={{ width: 120 }}
                  alt="logo"
                />
              </div>
            </Link>
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleClickMenu}
            className={classes.name}
          >
            <span>
              Hi,
              <strong> {userInfo.TenDangNhap}</strong>
            </span>

            <Avatar className={classes.avatar} src={userInfo.Avatar}></Avatar>
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            className={classes.menu}
          >
            <ListItem button onClick={handleHome}>
              <ListItemIcon>
                <Home fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                <Person fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemIcon>
                <Settings fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <img src="/images/logo.svg" className={classes.ShopLogo} alt="logo" />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          {" "}
          <ListSubheader style={{ marginRight: 60 }} inset>
            Quản lý
          </ListSubheader>
          {listPhanQuyen.includes(role.DASHBOARD) && (
            <ListItem button component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <Dvr />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYSANPHAM) && (
            <ListItem button component={Link} to="/admin/products">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Sản Phẩm" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYBANHANG) && (
            <ListItem button component={Link} to="/admin/bills">
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Bán Hàng" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYNGUOIDUNG) && (
            <ListItem button component={Link} to="/admin/users">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Người Dùng" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYNHACUNGCAP) && (
            <ListItem button component={Link} to="/admin/suppliers">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Nhà Cung Cấp" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYDATHANG) && (
            <ListItem button component={Link} to="/admin/orders">
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Đặt hàng" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYBANHANG) && (
            <ListItem button component={Link} to="/admin/inbox">
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Tư vấn" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYNHAPKHO) && (
            <ListItem button component={Link} to="/admin/recdockets">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Nhập Kho" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYPHIEUCHI) && (
            <ListItem button component={Link} to="/admin/paymentvouchers">
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="Phiếu Chi" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.QUANLYGIOHANG) && (
            <ListItem button component={Link} to="/admin/carts">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Giỏ Hàng" />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          {" "}
          <ListSubheader style={{ marginRight: 60 }} inset>
            Báo cáo
          </ListSubheader>
          {listPhanQuyen.includes(role.BAOCAOLOINHUAN) && (
            <ListItem button component={Link} to="/admin/products">
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Lợi nhuận" />
            </ListItem>
          )}
          {listPhanQuyen.includes(role.BAOCAOBANHANG) && (
            <ListItem button component={Link} to="/admin/reports">
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Bán hàng" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>{props.children}</div>
      </main>
    </div>
  );
});
