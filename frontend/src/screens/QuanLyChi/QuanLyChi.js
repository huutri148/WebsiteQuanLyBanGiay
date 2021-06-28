import {
    CssBaseline,
    makeStyles,
    Tab,
    Typography,
    Tabs,
  } from "@material-ui/core";
import { React, useState, useEffect } from "react";
import "../QuanLyBanHang/QuanLyBanHang.css";
import { useDispatch, useSelector } from "react-redux";
import DanhSachPhieuChi from "./DanhSachPhieuChi/DanhSachPhieuChi";
import DanhSachPhieuNhapKho from "./DanhSachPhieuNhapKho/DanhSachPhieuNhapKho";
  
  function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;
    return (
      <div className={classes.tab} {...other}>
        {value === index && <div p={3}>{children}</div>}
      </div>
    );
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "90vh",
      flexGrow: "1",
    },
    tabHeader: {
      textTransform: "none",
    },
    titleHeader: {
      padding: theme.spacing(4, 0),
      textTransform: "none",
      fontSize: 32,
      color: "darkslateblue",
      fontWeight: "Bold",
    },
  }));
  const QuanLyChi = () => {
    //styles
    const classes = useStyles();
    //Fetched data
    const dispatch = useDispatch();
    //variables
    const [value,setValue] = useState(0);
    //handle change
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <div>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={value}
              onChange={handleTabChange}
            >
              <Tab className={classes.tabHeader} label="Danh Sách Phiếu Nhập Kho" />
              <Tab className={classes.tabHeader} label={"Danh Sách Phiếu Chi"} />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            <DanhSachPhieuNhapKho 
              tabHeader = "Danh Sách Phiếu Nhập Kho"
              setValue = {setValue} 
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DanhSachPhieuChi 
              value = {value}
              tabHeader = "Danh Sách Phiếu Chi" />
          </TabPanel>
        </div>
      </>
    );
  };
  
  export default QuanLyChi;
  