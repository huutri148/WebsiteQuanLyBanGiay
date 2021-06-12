import { React, useState, useEffect } from "react";
import {
  CssBaseline,
  makeStyles,
  Paper,
  Tooltip,
  Grid,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  IconButton,
} from "@material-ui/core";
import { AddCircle, Edit, HighlightOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import ProductSelector from "../../components/controls/Selector/ProductSelector";
import IntroField from "../../components/controls/InfoField";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import SizeSelector from "../../components/controls/Selector/SizeSelector";
import useTable from "../../components/useTable";
import ProductCard from "../QuanLySanPham/ProductCard";
import {
  thongTinPhieu,
  CTPHHeadCell,
  QuanLyPhieuDatHangTab,
} from "./ThongTinPhieuDatHang";
import _ from "lodash";
import { fetchListGiay, setProducts } from "../../redux/actions/giayAction";
import { fetchListHangSanXuat } from "../../redux/actions/hangSanXuatAction";
import { fetchListSize } from "../../redux/actions/sizeAction";
import { fetchListMau } from "../../redux/actions/mauAction";
import { createPhieuDatHang } from "../../redux/actions/phieuDatHangAction";

const useStyles = makeStyles((theme) => ({
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

const PhieuDatHangForm = (props) => {
  //regex
  const phoneRegex = /^[0-9\b]+$/;
  const classes = useStyles();
  const dispatch = useDispatch();

  //State of component
  const [thongTinPhieuBoxes, setThongTinPhieuBoxes] = useState(thongTinPhieu);
  const [proSelector, setProSelector] = useState([]);
  const [chosenProduct, setChosenProduct] = useState(null);
  const [size, setSize] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stock, setStock] = useState(0);
  const [sizes, setSizes] = useState(0);
  const [editing, setEditing] = useState(false);
  const [ignored, forceUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(selectedProducts, CTPHHeadCell, filterFn);

  // Get state from reducer
  const supplierList = useSelector((state) => state.ListNhaCungCap);
  const productList = useSelector((state) => state.ListGiay);
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const colorList = useSelector((state) => state.ListMau);
  const productsList = useSelector((state) => state.SetProducts);
  const user = useSelector((state) => state.User);

  // Data Field
  const { listNhaCungCap } = supplierList;
  const { isCombined, products } = productsList;
  const { listGiay } = productList;
  const { listHangSanXuat } = brandList;
  const { listSize } = sizeList;
  const { listMau } = colorList;
  const { userInfo } = user;

  //Fetch NhaCungCap
  useEffect(() => {
    if (listNhaCungCap !== undefined) {
      thongTinPhieu[0].options = _.map(listNhaCungCap, (item) => {
        return { value: item.MaNhaCungCap, label: item.TenNhaCungCap };
      });
    }
  }, [listNhaCungCap]);

  // Fetch Product Information
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
    thongTinPhieu[1].value = userInfo.TenNguoiDung;
    if (!isCombined || typeof isCombined === "undefined") {
      fetchData();
    } else {
      setProSelector(products);
    }
  }, []);

  //Combine ProductInformation
  useEffect(() => {
    if (!isCombined || typeof isCombined === "undefined") {
      combineData();
    }
    if (listSize) {
      const data = _.map(listSize, (value) => {
        return value;
      });
      setSizes(data);
    }
  }, [loading]);

  const combineData = () => {
    if (listGiay != undefined) {
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
      if (productsData.length !== 0) dispatch(setProducts(productsData));
      setProSelector(productsData);
    }
  };
  const resetField = () => {
    setChosenProduct(null);
    setAmount(0);
    setSize(0);
    setStock(0);
  };

  //Interact element
  const onSizeChange = (e, size, MaChiTietGiay) => {
    setSize(size);
    setStock(e);
    chosenProduct.MaChiTietGiay = MaChiTietGiay;
  };
  const onAmountChange = (e) => {
    if (chosenProduct != null) {
      let tmp = e.target.value;
      if (tmp === "") {
        setAmount(0);
      } else if (tmp === 0 || phoneRegex.test(tmp)) {
        setAmount(Number(tmp));
        if (Number(tmp) > 0) setAmountError(false);
        else setAmountError(true);
      }
    }
  };
  const setSelectedProduct = (val) => {
    let selectedProduct = { ...listGiay[val] };
    setChosenProduct(selectedProduct);
  };
  const handleAddClick = () => {
    if (amount === 0) {
      setAmountError(true);
      return;
    }
    if (!editing) {
      if (
        selectedProducts.find(
          (element) => element.MaChiTietGiay === chosenProduct.MaChiTietGiay
        )
      )
        return;
      let shoes = { ...chosenProduct, SoLuongDat: amount, size };
      setAmount(0);
      selectedProducts.push(shoes);
    } else {
      chosenProduct.SoLuongDat = amount;
      chosenProduct.size = size;
      setEditing(false);
      resetField();
    }
  };
  const handleEditClick = (item) => {
    setChosenProduct(item);
    setEditing(true);
    setAmount(item.SoLuongDat);
  };
  const handleRemoveClick = (item) => {
    console.log(selectedProducts.splice(selectedProducts.indexOf(item), 1));
    setSelectedProducts(
      selectedProducts.splice(selectedProducts.indexOf(item), 1)
    );
  };

  const handleSubmitClick = () => {
    var check = false;
    thongTinPhieuBoxes.forEach((element) => {
      element.error = element.checkValidation(element.value);
      if (element.error === true) check = true;
    });
    if (check === true) forceUpdate(!ignored);
    else {
      //set default date
      if (thongTinPhieuBoxes[2].value === undefined) {
        let date = new Date().getDate();
        if (date < 10) date = "0" + date;
        let month = new Date().getMonth() + 1;
        if (month < 10) month = "0" + month;
        thongTinPhieuBoxes[2].value =
          new Date().getFullYear() + "-" + month + "-" + date;
      }
      //get record
      let record = {
        MaNguoiDung: userInfo.MaNguoiDung,
        MaNhaCungCap:
          thongTinPhieuBoxes[0].value === undefined
            ? 1
            : thongTinPhieuBoxes[0].value.value,
        NgayLap: thongTinPhieuBoxes[2].value,
        TrangThai: "Chờ",
        ChiTietPhieuDatHang: selectedProducts.map((element) => {
          return {
            MaChiTietGiay: element.MaChiTietGiay,
            SoLuongDat: element.SoLuongDat,
          };
        }),
      };
      console.log(record);
      dispatch(createPhieuDatHang(record));

      // Switch to List Tab
      props.SetTab(QuanLyPhieuDatHangTab.DanhSachPhieuDatHang);
    }
  };

  return (
    <div>
      <CssBaseline />
      <label className={classes.titleHeader}>Lập Phiếu Đặt Hàng</label>
      <div>
        <Grid container spacing={0}>
          {/* Order */}
          <Paper className={classes.paper} style={{ width: "20%" }}>
            <IntroField
              GroupBoxes={thongTinPhieuBoxes}
              cardHeader="Thông Tin Phiếu"
              buttonContent="Lập Phiếu"
              disabled={selectedProducts.length === 0 ? "disabled" : ""}
              onClick={handleSubmitClick}
            />
          </Paper>
          {/* Order details */}
          <Paper className={classes.paper} style={{ width: "72%", margin: 0 }}>
            <label className={classes.cardHeader}>Thông Tin Giày</label>
            <hr className={classes.hr} />
            <ProductSelector
              title="Hàng Hoá"
              products={proSelector}
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
                      value={
                        chosenProduct === null ? "" : chosenProduct.TenGiay
                      }
                      type="TextBox"
                      title={CTPHHeadCell[0].label}
                      readOnly={true}
                    />
                  </td>
                  <td width="12%">
                    <GroupBox
                      value={
                        chosenProduct === null ? "" : chosenProduct.GioiTinh
                      }
                      type="TextBox"
                      title={CTPHHeadCell[1].label}
                      disabled="disabled"
                    />
                  </td>
                  <td width="15%">
                    <GroupBox
                      value={stock}
                      type="TextBox"
                      title="Số lượng tồn"
                      disabled="disabled"
                    />
                  </td>
                  <td width="15%">
                    {chosenProduct === null ? (
                      <GroupBox
                        type="TextBox"
                        title={CTPHHeadCell[1].label}
                        disabled="disabled"
                      />
                    ) : editing ? (
                      <GroupBox
                        key={2}
                        type="TextBox"
                        title={CTPHHeadCell[1].label}
                        disabled="disabled"
                        value={sizes[chosenProduct.size].TenSize}
                      />
                    ) : (
                      <SizeSelector
                        title="Size"
                        ListSize={sizes}
                        selectedSize={size}
                        onSizeChange={onSizeChange}
                        item={chosenProduct}
                      />
                    )}
                  </td>
                  <td width="12%">
                    <GroupBox
                      value={amount}
                      type="Number"
                      title={CTPHHeadCell[2].label}
                      onChange={onAmountChange}
                      error={amountError}
                      validationTip={"Số Lượng phải lớn hơn 0  "}
                      disabled={chosenProduct === null ? "disabled" : ""}
                    />
                  </td>
                  <td width="10%">
                    <IconButton
                      style={{ marginBottom: -10 }}
                      aria-label="Add"
                      color="primary"
                      size="small"
                      disabled={chosenProduct === null ? "disabled" : ""}
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
                          PrimaryText={item.TenGiay}
                        />
                      </TableCell>
                      <TableCell component="td" scope="row">
                        {sizes[item.size].TenSize}
                      </TableCell>
                      <TableCell component="td" scope="row">
                        {item.SoLuongDat}
                      </TableCell>
                      <TableCell component="td" scope="row">
                        <Tooltip title="Sửa">
                          <IconButton size="small" color="primary">
                            <Edit onClick={() => handleEditClick(item)} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleRemoveClick(item)}
                          >
                            <HighlightOff />
                          </IconButton>
                        </Tooltip>
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
    </div>
  );
};

export default PhieuDatHangForm;
