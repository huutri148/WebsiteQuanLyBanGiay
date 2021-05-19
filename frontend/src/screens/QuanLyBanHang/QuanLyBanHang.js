import {
  CssBaseline,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Grid,
  TableBody,
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
import InfoField from "../../components/controls/InfoField";
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
  { id: "GioiTinh", label: "Giới Tính" },
  { id: "Size", label: "Size" },
  { id: "DonGia", label: "Đơn Giá" },
  { id: "SoLuong", label: "Số Lượng" },
  { id: "ThanhTien", label: "Thành Tiền" },
  { id: "HanhDong" },
];
const selectedProducts = [];
const QuanLyBanHang = () => {
  const [ignored, forceUpdate] = useState(false);
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState();
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState();
  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedLength, setSelectedLength] = useState(0);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  //regex
  const phoneRegex = /^[0-9\b]+$/;
  //table
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(selectedProducts, headCells, filterFn);
  const setSelectedProduct = (val) => {
    setSelectedId(val);
    let tmp = products.find((obj) => obj.MaGiay === val);
    setProduct(tmp);
    setAmount();
    setTotal(0);
  };
  //handle Button click
  const handleAddClick = () => {
    if (product === null) {
      //set arlet
    } else if (
      selectedProducts.find((item) => item.MaGiay === product.MaGiay) ===
      undefined
    ) {
      let tmp = product;
      tmp.total = total;
      tmp.amount = amount;
      selectedProducts.push(tmp);
      setSelectedLength(selectedProducts.length);
      setSumTotal(sumTotal + total);
    } else {
      setSumTotal(sumTotal + total - product.total);
      let tmp = selectedProducts[selectedProducts.indexOf(product)];
      tmp.total = total;
      tmp.amount = amount;
    }
    forceUpdate(!ignored);
  };
  const handleRemoveClick = (item) => {
    selectedProducts.splice(selectedProducts.indexOf(item), 1);
    forceUpdate(!ignored);
    setSumTotal(sumTotal - item.total);
  };
  const handleEditClick = (item) => {
    setProduct(item);
    forceUpdate(!ignored);
  };
  //handle Change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const onAmountChange = (e) => {
    if (product != null) {
      let tmp = e.target.value;
      if (tmp === "" || phoneRegex.test(tmp)) {
        setAmount(Number(tmp));
        setTotal(tmp * product.DonGia);
      }
    }
  };

  const onInputChange = (e, title) => {
    let tmp = groupBoxes.find((obj) => obj.title === title);
    tmp.value = e.target.value;
  };
  //Field titles
  const groupBoxes = [
    {
      type: "TextBox",
      title: "Tên Khách Hàng",
      required: true,
      onChange: (e, title) => onInputChange(e, title),
      validationTip: "Tên Khách Hàng không được trống",
    },
    {
      type: "Number",
      title: "Số Điện Thoại",
      required: true,
      onChange: (e, title) => onInputChange(e, title),
      validationTip: "Số Điện Thoại không được trống",
    },
    {
      type: "TextBox",
      title: "Tổng Tiền",
      required: true,
      disabled: "disabled",
      onChange: (e, title) => onInputChange(e, title),
      value: sumTotal.toLocaleString("it-IT"),
    },
    {
      type: "TextBox",
      title: "Người Lập",
      required: true,
      onChange: (e, title) => onInputChange(e, title),
      disabled: "disabled",
    },
    {
      type: "Picker",
      title: "Ngày Lập",
      onChange: (e, title) => onInputChange(e, title),
      required: true,
    },
    {
      type: "TextBox",

      title: "Ghi Chú",
      onChange: (e, title) => onInputChange(e, title),
      required: false,
    },
  ];
  const [records, setRecords] = useState(groupBoxes);
  const handleSubmitClick = () => {
    groupBoxes.forEach((element) => {
      element.error = true;
    });
    setRecords(groupBoxes);
    forceUpdate(!ignored);
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
        {value === 0 ? "Lập Phiếu Bán Hàng" : "Danh Sách Phiếu Bán Hàng"}
      </label>
      <TabPanel value={value} index={0}>
        <div>
          <Grid container spacing={0}>
            <Paper className={classes.paper} style={{ width: "20%" }}>
              <InfoField
                GroupBoxes={records}
                cardHeader="Thông Tin Phiếu"
                buttonContent="Lập Phiếu"
                onClick={handleSubmitClick}
              />
            </Paper>
            <Paper
              className={classes.paper}
              style={{ width: "72%", margin: 0 }}
            >
              <label className={classes.cardHeader}>Thông Tin Giày</label>
              <hr className={classes.hr} />
              <Selector
                title="Hàng Hoá"
                products={products}
                setSelectedId={setSelectedProduct}
              />
              <hr className={classes.hr} style={{ marginTop: 15 }} />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="25%">
                      <GroupBox
                        value={product === null ? "" : product.TenGiay}
                        type="TextBox"
                        title={headCells[0].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="15%">
                      <GroupBox
                        value={product === null ? "" : product.GioiTinh}
                        type="TextBox"
                        title={headCells[1].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="10%">
                      <GroupBox
                        value={product === null ? "" : product.Size}
                        type="TextBox"
                        title={headCells[2].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="15%">
                      <GroupBox
                        value={product === null ? "" : product.DonGia}
                        type="TextBox"
                        title={headCells[3].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="15%">
                      <GroupBox
                        value={amount}
                        type="Number"
                        title={headCells[4].label}
                        onChange={onAmountChange}
                      />
                    </td>
                    <td width="15%">
                      <GroupBox
                        value={
                          product === null ? "" : total.toLocaleString("it-IT")
                        }
                        type="TextBox"
                        title={headCells[5].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="15%">
                      <IconButton
                        style={{ marginBottom: -10 }}
                        aria-label="Add"
                        color="primary"
                        size="small"
                        onClick={handleAddClick}
                      >
                        <AddCircle />
                      </IconButton>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <hr className={classes.hr} />
              <TableContainer
                style={{ display: selectedLength === 0 ? "none" : "table" }}
                className={classes.table}
              >
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item, index) => (
                      <TableRow
                        key={item.MaGiay}
                        style={
                          index % 2
                            ? { background: "#eee" }
                            : { background: "white" }
                        }
                      >
                        <TableCell component="td" width="40%" scope="row">
                          <ProductCard
                            imgUrl={item.Anh}
                            productName={item.TenGiay}
                          />
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
                        <TableCell component="td" scope="row">
                          {item.total}
                        </TableCell>
                        <TableCell component="td" width="15%" scope="row">
                          <IconButton size="small" color="primary">
                            <Edit onClick={() => handleEditClick(item)} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleRemoveClick(item)}
                          >
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
