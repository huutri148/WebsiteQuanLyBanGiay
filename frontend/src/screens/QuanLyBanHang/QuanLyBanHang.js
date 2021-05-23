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
import { React, useState, useEffect } from "react";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import Selector from "../../components/controls/Selector/Selector";
import "./QuanLyBanHang.css";
import { AddCircle, Edit, HighlightOff } from "@material-ui/icons";
import useTable from "../../components/useTable";
import ProductCard from "../QuanLySanPham/ProductCard";
import InfoField from "../../components/controls/InfoField";
import { useDispatch, useSelector } from "react-redux";
import { fetchListGiay } from "../../actions/giayAction";
import { fetchListHangSanXuat } from "../../actions/hangSanXuatAction";
import { fetchListSize } from "../../actions/sizeAction";
import { fetchListMau } from "../../actions/mauAction";
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
  //Fetched data
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.ListGiay);
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const colorList = useSelector((state) => state.ListMau);
  const { error: hangSanXuatError, listHangSanXuat } = brandList;
  const { error: giayError, listGiay } = productList;
  const { error: sizeError, listSize } = sizeList;
  const { error: mauError, listMau } = colorList;
  //hooks
  const [ignored, forceUpdate] = useState(false);
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState();
  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [amountError, setAmountError] = useState(false);
  //regex
  const phoneRegex = /^[0-9\b]+$/;
  //table
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(selectedProducts, headCells, filterFn);
  const setSelectedProduct = (val) => {
    setSelectedId(val);
    let tmp = products.find((obj) => obj.MaGiay === val);
    setProduct(tmp);
    setAmount(0);
    setTotal(0);
  };
  //handle Button click
  const handleAddClick = () => {
    if (amount === 0) {
      setAmountError(true);
      return;
    }
    if (
      selectedProducts.find((item) => item.MaGiay === product.MaGiay) ===
      undefined
    ) {
      let tmp = sumTotal + total;
      setSumTotal(tmp);
      groupBoxes[2].value = tmp.toLocaleString("it-IT");
      let shoe = product;
      shoe.total = total;
      shoe.amount = amount;
      selectedProducts.push(shoe);
    } else {
      let tmp = sumTotal + total - product.total;
      setSumTotal(tmp);
      groupBoxes[2].value = tmp.toLocaleString("it-IT");
      let shoe = selectedProducts[selectedProducts.indexOf(product)];
      shoe.total = total;
      shoe.amount = amount;
    }
  };
  const handleRemoveClick = (item) => {
    selectedProducts.splice(selectedProducts.indexOf(item), 1);
    let tmp = sumTotal - item.total;
    setSumTotal(tmp);
    groupBoxes[2].value = tmp.toLocaleString("it-IT");
  };
  const handleEditClick = (item) => {
    setProduct(item);
    forceUpdate(!ignored);
  };
  //Field titles
  const [groupBoxes, setGroupBoxes] = useState([
    {
      type: "TextBox",
      title: "Tên Khách Hàng",
      required: true,
      onChange: (e, title) => {
        let tmp = groupBoxes.find((obj) => obj.title === title);
        tmp.value = e.target.value;
      },
      validationTip: "Tên Khách Hàng không được trống",
      error: false,
      checkValidation: (val) => {
        if (val === null || val === "" || val === undefined) return true;
        return false;
      },
    },
    {
      type: "Number",
      title: "Số Điện Thoại",
      required: true,
      onChange: (e, title) => {
        let tmp = groupBoxes.find((obj) => obj.title === title);
        tmp.value = e.target.value;
      },
      validationTip: "Số Điện Thoại không được trống",
      error: false,
      checkValidation: (val) => {
        console.log(val);
        if (val === null || val === "" || val === undefined) return true;
        return false;
      },
    },
    {
      type: "TextBox",
      title: "Tổng Tiền",
      required: true,
      disabled: "disabled",
      value: 0,
      validationTip: "Tổng Tiền không được bằng 0",
      error: false,
      checkValidation: (val) => {
        if (sumTotal === 0) return true;
        return false;
      },
    },
    {
      type: "TextBox",
      title: "Người Lập",
      required: true,
      disabled: "disabled",
      checkValidation: (val) => false,
    },
    {
      type: "Picker",
      title: "Ngày Lập",
      onChange: (e, title) => {
        let tmp = groupBoxes.find((obj) => obj.title === title);
        tmp.value = e.target.value;
      },
      required: true,
      checkValidation: (val) => false,
    },
    {
      type: "TextBox",
      title: "Ghi Chú",
      onChange: (e, title) => {
        let tmp = groupBoxes.find((obj) => obj.title === title);
        tmp.value = e.target.value;
      },
      required: false,
      checkValidation: (val) => false,
    },
  ]);
  //handle submit
  const handleSubmitClick = () => {
    groupBoxes.forEach((element) => {
      element.error = element.checkValidation(element.value);
    });
    forceUpdate(!ignored);
  };
  //handle Change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const onAmountChange = (e) => {
    if (product != null) {
      let tmp = e.target.value;
      if (Number(tmp) === 0 || phoneRegex.test(tmp)) {
        setAmount(Number(tmp));
        setTotal(tmp * product.DonGia);
        if (Number(tmp) > 0) setAmountError(false);
      }
    }
  };
  // setProducts when done fetching
  useEffect(() => {
    const data = Object.values(listGiay).reduce((result, value) => {
      let maHSX = value.MaHangSanXuat;
      if (typeof listHangSanXuat[maHSX] === "undefined") return [];
      let { TenHangSanXuat } = listHangSanXuat[maHSX];
      let maMau = value.MaMau;
      if (typeof listMau[maMau] === "undefined") return [];
      let { TenMau } = listMau[maMau];
      result.push({
        TenHangSanXuat,
        TenMau,
        ...value,
      });
      console.log(result);
      return result;
    }, []);
    setProducts(data);
    setLoading(true);
  }, [loading]);
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListGiay());
      await dispatch(fetchListHangSanXuat());
      await dispatch(fetchListSize());
      await dispatch(fetchListMau());
      //set Flag to combine TableData
      // Note: Find a way to select lastest data
      // Done have to use Flag
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
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
                GroupBoxes={groupBoxes}
                cardHeader="Thông Tin Phiếu"
                buttonContent="Lập Phiếu"
                disabled={selectedProducts.length === 0 ? "disabled" : ""}
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
                        value={product === null ? "" : product.DonGiaNhap}
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
                        error={amountError}
                        validationTip="Số Lượng phải lớn hơn 0"
                        disabled={product === null ? "disabled" : ""}
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
                        disabled={product === null ? "disabled" : ""}
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
                style={{
                  display: selectedProducts.length === 0 ? "none" : "table",
                }}
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
