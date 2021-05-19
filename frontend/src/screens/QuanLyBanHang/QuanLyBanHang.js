import {
  CssBaseline,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Grid,
  Button,
  TableBody,
  withStyles,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  IconButton,
} from "@material-ui/core";
import { React, useState } from "react";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import Selector from "../../components/controls/Selector/Selector";
import "./QuanLyBanHang.css";
import { AddCircle, Edit, HighlightOff } from "@material-ui/icons";
import useTable from "../../components/useTable";
import ProductCard from "../QuanLySanPham/ProductCard";
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
    margin: theme.spacing(0, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: "fit-content",
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "darkslateblue",
  },
  hr: {
    border: 0,
    borderTop: "1px solid #eee",
    width: "100%",
  },
  tabHeader: {
    textTransform: "none",
  },
  titleHeader: {
    textTransform: "none",
    fontSize: 32,
    color: "darkslateblue",
    fontWeight: "Bold",
  },
  td: {
    padding: "0px 10px",
  },
  table: {
    padding: theme.spacing(0, 1),
  },
}));

const products = [
  {
    MaGiay: 1,
    TenGiay: "Van Old Skool Violet",
    TenHangSanXuat: "Nike",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/2.jpg",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 3,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 2,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 4,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 5,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 6,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 7,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    DonGia: "2000000",
  },
];
const headCells = [
  { id: "TenGiay", label: "Tên Giày" },
  { id: "GioiTinh", label: "Giới Tính"},
  { id: "Size", label: "Size"},
  { id: "DonGia", label: "Đơn Giá"},
  { id: "SoLuong", label: "Số Lượng" },
  { id: "ThanhTien", label: "Thành Tiền" },
  { id: "HanhDong" },
];
const selectedProducts = [];
const QuanLyBanHang = () => {
  const [ignored,forceUpdate] = useState(false);
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState();
  const [record, setRecord] = useState(null);
  const [total, setTotal] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [selectedLength,setSelectedLength] = useState(0);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(selectedProducts, headCells, filterFn);
  const setSelectedProduct = (val) =>{
    setSelectedId(val);
    let tmp = products.find((obj) => obj.MaGiay === val);
    setRecord(tmp);
    setAmount(0);
    setTotal(0);
  }
  const handleAddClick = () => 
  {
    if(record === null)
    {
      //set arlet
    }
    else if(selectedProducts.find(item => item.MaGiay === record.MaGiay) == undefined)
    {
      let tmp = record;
      tmp.total = total;
      tmp.amount = amount;
      selectedProducts.push(tmp);
      setSelectedLength(selectedProducts.length);
      setSumTotal(sumTotal + total);
    }
    else{
      let tmp = selectedProducts[selectedProducts.indexOf(record)];
      tmp.total = total;
      tmp.amount = amount;
      setSelectedLength(selectedProducts.length);
      setSumTotal(sumTotal + total - record.total);
    }
    forceUpdate(!ignored);
  };
  const handleRemoveClick = (item) => {
    selectedProducts.splice(selectedProducts.indexOf(item),1);
    forceUpdate(!ignored);
    setSumTotal(sumTotal - item.total);
  };
  const handleEditClick = (item) => {
    setRecord(item);
    forceUpdate(!ignored);
  };
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const onAmountChange = (e) => {
    if(record != null)
    {
      setAmount(Number(e.target.value));
      setTotal(e.target.value * record.DonGia);   
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleTabChange}
        >
          <Tab className={classes.tabHeader} label="Lập Phiếu Bán Hàng" />
          <Tab className={classes.tabHeader} label="Danh Sách Phiếu Bán Hàng" />
        </Tabs>
      </div>
      <label className={classes.titleHeader}>
        {value == 0 ? "Lập Phiếu Bán Hàng" : "Danh Sách Phiếu Bán Hàng"}
      </label>
      <TabPanel value={value} index={0}>
        <div>
          <Grid container spacing={0}>
            <Paper className={classes.paper} style={{ width: "20%" }}>
              <label
                className={classes.cardHeader}
                style={{ textAlign: "center" }}
              >
                Thông Tin Phiếu
              </label>
              <hr className={classes.hr} />
              <GroupBox type="TextBox" title="Tên Khách Hàng" required={true} />
              <GroupBox type="TextBox" title="Số Điện Thoại" required={true} />
              <GroupBox
                type="TextBox"
                title="Tổng Tiền"
                disabled="disabled"
                value = {Number(sumTotal).toLocaleString('it-IT')}
                required={true}
              />
              <GroupBox
                type="TextBox"
                title="Người Lập"
                disabled="disabled"
                required={true}
              />
              <GroupBox type="Picker" title="Ngày Lập" required={true} />
              <GroupBox type="TextBox" title="Ghi Chú" required={false} />
              <Button size="large" variant="contained" color="primary">
                Lập Phiếu
              </Button>
              <hr className={classes.hr} />
              <label
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Lưu ý: Tiền được tính theo VNĐ
              </label>
            </Paper>
            <Paper
              className={classes.paper}
              style={{ width: "72%", margin: 0 }}
            >
              <label className={classes.cardHeader}>Thông Tin Giày</label>
              <hr className={classes.hr} />
              <Selector title="Hàng Hoá" products={products} setSelectedId = {setSelectedProduct} />
              <hr className={classes.hr} style={{ marginTop: 15 }} />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{headCells[0].label}</th>
                    <th>{headCells[1].label}</th>
                    <th>{headCells[2].label}</th>
                    <th>{headCells[3].label}</th>
                    <th>{headCells[4].label}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="25%">
                      <input value = {record === null ? "" : record.TenGiay} disabled="disabled"/>
                    </td>
                    <td width="15%">
                      <input value = {record === null ? "" : record.GioiTinh} disabled="disabled" />
                    </td>
                    <td width="10%">
                      <input value = {record === null ? "" : record.Size} disabled="disabled" />
                    </td>
                    <td width="15%">
                      <input value = {record === null ? "" : Number(record.DonGia).toLocaleString('it-IT')} disabled="disabled" />
                    </td>
                    <td width="15%">
                      <input value = {amount} onChange = {onAmountChange} />
                    </td>
                    <td width="15%">
                      <input value = {record === null ? "" : total.toLocaleString('it-IT')} disabled="disabled" />
                    </td>
                    <td width="15%">
                      <IconButton
                        style={{ marginBottom: 15 }}
                        aria-label="Add"
                        size="small"
                        onClick = {handleAddClick}>
                        <AddCircle />
                      </IconButton>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <hr className={classes.hr} />
              <TableContainer style = {{display: selectedLength === 0 ? "none" : "table"}} className={classes.table}>
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item, index) => (
                      <TableRow
                        key={item.MaGiay}
                        style={
                          index % 2 ? { background: "#eee" } : { background: "white" }
                        }>
                        <TableCell component="td" width="40%" scope="row">
                        <ProductCard imgUrl={item.Anh} productName={item.TenGiay} />
                        </TableCell>
                        <TableCell component="td" scope="row">
                        {item.GioiTinh}
                        </TableCell>
                        <TableCell component="td" scope="row">
                        {item.Size}
                        </TableCell>
                        <TableCell component="td" scope="row">
                        {item.DonGia}
                        </TableCell>
                        <TableCell component="td" scope="row">
                        {item.amount}
                        </TableCell>
                        <TableCell component="td"scope="row">
                        {item.total}
                        </TableCell>
                        <TableCell component="td" width="15%" scope="row">
                          <IconButton size="small" color="primary">
                            <Edit onClick={()=>handleEditClick(item)}/>
                          </IconButton>
                          <IconButton size="small" color="secondary" onClick={()=>handleRemoveClick(item)}>
                            <HighlightOff />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination />
              </TableContainer>
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
