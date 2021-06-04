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
import ProductSelector from "../../components/controls/Selector/ProductSelector";
import "./QuanLyBanHang.css";
import { AddCircle, ContactsOutlined, Edit, HighlightOff } from "@material-ui/icons";
import useTable from "../../components/useTable";
import ProductCard from "../QuanLySanPham/ProductCard";
import InfoField from "../../components/controls/InfoField";
import { useDispatch, useSelector } from "react-redux";
import { fetchListGiay } from "../../actions/giayAction";
import { fetchListHangSanXuat } from "../../actions/hangSanXuatAction";
import { fetchListSize } from "../../actions/sizeAction";
import { fetchListMau } from "../../actions/mauAction";
import { fetchGiaySize } from "../../actions/giayAction";
import Select from "react-select";
import SizeSelector from "../../components/controls/Selector/SizeSelector";
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
  //styles
  const classes = useStyles();
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
  //const [record, setRecord]
  const [ignored, forceUpdate] = useState(false);
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState();
  const [amountError, setAmountError] = useState(false);
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
    let tmp = products.find((obj) => obj.MaGiay === val);
    setProduct(tmp);
    setAmount(0);
    setMaxAmount(0);
    setTotal(0);
    setSize(0);
  };
  //handle Button click
  const handleAddClick = () => {
    if (amount === 0) {
      setAmountError(true);
      return;
    }
    if (selectedProducts.find((item) => item.MaGiay === product.MaGiay) === undefined) 
    {
      let tmp = sumTotal + total;
      setSumTotal(tmp);
      groupBoxes[2].value = tmp.toLocaleString("it-IT");
      let shoe = product;
      shoe.total = total;
      shoe.amount = amount;
      shoe.size = size;
      selectedProducts.push(shoe);
    } 
    else 
    {
      let tmp = sumTotal + total - product.total;
      setSumTotal(tmp);
      groupBoxes[2].value = tmp.toLocaleString("it-IT");
      let shoe = selectedProducts[selectedProducts.indexOf(product)];
      shoe.total = total;
      shoe.amount = amount;
      shoe.size = size;
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
      onChange: (e) => groupBoxes[0].value = e.target.value,
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
      onChange: (e) => groupBoxes[1].value = e.target.value,
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
      type: "Select",
      title: "Phương Thức Thanh Toán",
      required: true,
      options: ["Thanh toán trực tiếp", "Thanh toán online"],
      error: false,
      value: "Thanh toán trực tiếp",
      onChange: (e) => groupBoxes[3].value = e.target.value,
      checkValidation: (val) => false,
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
      onChange: (e) => groupBoxes[4].value = e.target.value,
      required: true,
      checkValidation: (val) => false,
    },
    {
      type: "TextBox",
      title: "Ghi Chú",
      onChange: (e) => groupBoxes[5].value = e.target.value,
      required: false,
      checkValidation: (val) => false,
    },
  ]);
  //handle submit
  const handleSubmitClick = () => {
    var check = false;
    groupBoxes.forEach((element) => {
      element.error = element.checkValidation(element.value);
      if(element.error === true)
        check = true;
    });
    if(check === true)
      forceUpdate(!ignored);
    else
    {
      let item = {
        MaNguoiDung : 2,
        MaKhanhHang : 1,
        TenKhachHang : groupBoxes[0].value,
        SoDienThoai: groupBoxes[1].value,
        PhuongThucThanhToan:groupBoxes[3].value,
        NgayLap: groupBoxes[4].value,
        TongTien : sumTotal,
        GhiChu : groupBoxes[5].value,
      }
      console.log(item);
    }
  };
  //handle Change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const onAmountChange = (e) => {
    if (product != null) 
    {
      let tmp = e.target.value;
      if(tmp === "")
      {
        setAmount(0);
        setTotal(0);
      }
      else
        if (tmp === 0 || phoneRegex.test(tmp)) {
          setAmount(Number(tmp));
          setTotal(Number(tmp) * product.DonGia);
          console.log(product);
          if (Number(tmp) > 0 && Number(tmp) <= maxAmount)   
            setAmountError(false);
          else
            setAmountError(true);
        }
    }
  };
  const onSizeChange = (e,size) => {
    console.log(sizes);
    setSize(size);
    setMaxAmount(e);
    setAmount(e);
    setTotal(e * product.DonGia);
  }
  // set and map Products and Sizes when done fetching
  useEffect(() => {
    const productsData = Object.values(listGiay).reduce((result, value) => {
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
      return result;
    }, []);
    const sizesData = Object.values(listSize).reduce((result, value) => {
      result.push({
        ...value,
      });
      return result;
    }, []);
    let tempData = productsData.map((item)=>{
      item.DonGia = item.DonGiaNhap * (100 + item.TyLeLoiNhuan *100)/100;
      return item;
    });
    setProducts(tempData);
    setSizes(sizesData);
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
      setLoading(!loading);
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
            {/* bill */}
            <Paper className={classes.paper} style={{ width: "20%" }}>
              <InfoField
                GroupBoxes={groupBoxes}
                cardHeader="Thông Tin Phiếu"
                buttonContent="Lập Phiếu"
                disabled={selectedProducts.length === 0 ? "disabled" : ""}
                onClick={handleSubmitClick}
              />
            </Paper>
            {/* bill details */}
            <Paper
              className={classes.paper}
              style={{ width: "72%", margin: 0 }}
            >
              <label className={classes.cardHeader}>Thông Tin Giày</label>
              <hr className={classes.hr} />
              <ProductSelector
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
                    <td width="30%">
                      <GroupBox
                        value={product === null ? "" : product.TenGiay}
                        type="TextBox"
                        title={headCells[0].label}
                        readOnly = {true}
                      />
                    </td>
                    <td width="12%">
                      <GroupBox
                        value={product === null ? "" : product.GioiTinh}
                        type="TextBox"
                        title={headCells[1].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="15%">
                      {
                        product === null ? <GroupBox
                        type="TextBox"
                        title={headCells[2].label}
                        disabled="disabled"/> : <SizeSelector
                        title="Size"
                        ListSize ={sizes}
                        selectedSize = {size}
                        onSizeChange = {onSizeChange}
                        item ={product}/>
                      }
                    </td>
                    <td width="15%">
                      <GroupBox
                        value={product === null ? "" : product.DonGia.toLocaleString("it-IT")}
                        type="TextBox"
                        title={headCells[3].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="12%">
                      <GroupBox
                        value={amount}
                        type="Number"
                        title={headCells[4].label}
                        onChange={onAmountChange}
                        error={amountError}
                        validationTip={"Số Lượng phải lớn hơn 0 và nhỏ hơn " + maxAmount}
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
                    <td width="10%">
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
                            imgUrl={"/images/" + item.Anh}
                            productName={item.TenGiay}
                          />
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.GioiTinh}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {sizes[item.size].TenSize}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.DonGia.toLocaleString("it-IT")}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.amount}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.total.toLocaleString("it-IT")}
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
