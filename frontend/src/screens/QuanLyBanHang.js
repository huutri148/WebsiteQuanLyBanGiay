import {
    CssBaseline,
    InputAdornment,
    makeStyles,
    Paper,
    Tab,
    Tabs,
    Grid,
    Toolbar,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Button,
    Typography,
  } from "@material-ui/core";
  import { React, useState } from "react";
  import useTable from "../components/useTable";
  import GroupBox from "../components/controls/GroupBox/GroupBox";
  import Selector from "../components/controls/Selector/Selector";
  
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
    paper: {
      margin: theme.spacing(0,4),
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      height: 'fit-content'
    },
    tab: {
      margin: theme.spacing(2, 0),
      display: "block",
      float: "left",
      width: "100%",
    },
    tabPaper: {
      display: "inline-block",
      float: "left",
    },
    searchInput: {
      width: "75%",
      margin: theme.spacing(4, 6),
    },
    table: {
      width: "80%",
      margin: theme.spacing(4, 6),
    },
    cardHeader:{
      fontSize: 24,
      fontWeight: "600" , 
      color: "darkslateblue"
    },
    hr: {
      border: 0,
      borderTop: "1px solid #eee", 
      width: "100%"
    },
    tabHeader:{
      textTransform: 'none',
    },
    titleHeader:{
      textTransform: 'none',
      fontSize: 32, 
      color: "darkslateblue",
      fontWeight: 'Bold'
    }
  }));
  
  const getStripedStyle = (index) => {
    return { background: index % 2 ? "#fafafa" : "white" };
  };
  const products = [
    {
      MaGiay: 1,
      TenGiay: "Van Old Skool Violet",
      TenHangSanXuat: "Nike",
      TenMau: "Violet",
      GioiTinh: "Unisex",
      SoLuong: 20,
    },
    {
      MaGiay: 3,
      TenGiay: "Fila Wave Neo",
      TenHangSanXuat: "Fila",
      TenMau: "Violet",
      GioiTinh: "Unisex",
      SoLuong: 20,
    },
    {
      MaGiay: 2,
      TenGiay: "Fila Wave Neo",
      TenHangSanXuat: "Fila",
      TenMau: "Violet",
      GioiTinh: "Unisex",
      SoLuong: 20,
    },
    {
      MaGiay: 4,
      TenGiay: "Fila Wave Neo",
      TenHangSanXuat: "Fila",
      TenMau: "Violet",
      GioiTinh: "Unisex",
      SoLuong: 20,
    },
    {
      MaGiay: 5,
      TenGiay: "Fila Wave Neo",
      TenHangSanXuat: "Fila",
      TenMau: "Violet",
      GioiTinh: "Unisex",
      SoLuong: 20,
    },
  ];
  const headCells = [
    { id: "TenGiay", label: "Tên sản phẩm" },
    { id: "TenHangSanXuat", label: "Tên hãng sản xuất", disableSorting: true },
    { id: "TenMau", label: "Tên màu", disableSorting: true },
    { id: "GioiTinh", label: "Giới tính", disableSorting: true },
    { id: "SoLuong", label: "Số lượng" },
    { id: "actions", label: "Actions" },
  ];
  const QuanLyBanHang = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const classes = useStyles();
    const [records, setRecords] = useState(products);
    const [filterFn, setFilterFn] = useState({
      fn: (items) => {
        return items;
      },
    });
  
    const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn);
  
    const handleSearch = (e) => {
      let target = e.target;
      setFilterFn({
        fn: (items) => {
          if (target.value == "") return items;
          else
            return items.filter((x) =>
              x.fullName.toLowerCase().includes(target.value)
            );
        },
      });
    };
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div>
        <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={value}
            onChange={handleChange}>
            <Tab className={classes.tabHeader} label="Lập Phiếu Bán Hàng" />
            <Tab className={classes.tabHeader} label="Danh Sách Phiếu Bán Hàng" />        
          </Tabs>
        </div>
        <label className={classes.titleHeader}>
              {value == 0 ? 'Lập Phiếu Bán Hàng' : 'Danh Sách Phiếu Bán Hàng'} 
        </label>
        <TabPanel value={value} index={0}>
          <div>
            <Grid container spacing={0}>
              <Paper className={classes.paper} style = {{width: "20%"}}> 
                <label className={classes.cardHeader} style={{textAlign: 'center'}}>
                    Thông Tin Phiếu 
                </label>   
                <hr className={classes.hr}/>
                <GroupBox type = 'TextBox' title = "Tên Khách Hàng"  required = {true}/>
                <GroupBox type = 'TextBox' title = "Số Điện Thoại"  required = {true}/>
                <GroupBox type = 'TextBox' title = "Tổng Tiền" disabled = "disabled" required = {true}/>
                <GroupBox type = 'TextBox' title = "Người Lập" disabled = "disabled" required = {true}/>
                <GroupBox type = 'Picker' title = "Ngày Lập"  required = {true}/>
                <GroupBox type = 'TextBox' title = "Ghi Chú" required = {false}/>
                <Button
                  size="large"
                  variant="contained"
                  color="primary">
                  Lập Phiếu
                </Button>
                <hr className={classes.hr}/>
                <label style={{color: "red",fontWeight:"bold", textAlign: "center"}}>Lưu ý: Tiền được tính theo VNĐ</label>
              </Paper>
              <Paper className={classes.paper} style = {{width: "72%", margin: 0, }}> 
                <label className={classes.cardHeader}>
                    Chi Tiết Phiếu 
                </label>   
                <hr className={classes.hr}/>
                <Selector title = "Hàng Hoá" />
              </Paper>
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Thêm sản phẩm mới
        </TabPanel>
        <TabPanel value={value} index={2}>
          Sửa sản phẩm
        </TabPanel>
      </div>
    );
  };
  
  export default QuanLyBanHang;
  