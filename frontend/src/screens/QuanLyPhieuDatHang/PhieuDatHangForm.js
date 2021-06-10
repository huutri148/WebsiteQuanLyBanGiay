import { React, useState, useEffect } from "react";
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
import { AddCircle } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import ProductSelector from "../../components/controls/Selector/ProductSelector";
import IntroField from "../../components/controls/InfoField";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import { thongTinPhieu, CTPHHeadCell } from "./ThongTinPhieuDatHang";
import _ from "lodash";
import {
  fetchListGiay,
  setProducts,
  fetchGiaySize,
} from "../../redux/actions/giayAction";
import { fetchListHangSanXuat } from "../../redux/actions/hangSanXuatAction";
import { fetchListSize } from "../../redux/actions/sizeAction";
import { fetchListMau } from "../../redux/actions/mauAction";

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

const PhieuDatHangForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [thongTinPhieuBoxes, setThongTinPhieuBoxes] = useState(thongTinPhieu);
  const [loading, setLoading] = useState(false);
  const [proSelector, setProSelector] = useState([]);
  const [chosenProduct, setChosenProduct] = useState(null);
  const [chosenCT, setChosenCT] = useState(0);

  const supplierList = useSelector((state) => state.ListNhaCungCap);
  const productList = useSelector((state) => state.ListGiay);
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const colorList = useSelector((state) => state.ListMau);
  const productsList = useSelector((state) => state.SetProducts);

  const { listNhaCungCap } = supplierList;
  const { isCombined, products } = productsList;
  const { loading: productLoading, listGiay } = productList;
  const { loading: HSXLoading, listHangSanXuat } = brandList;
  const { loading: sizeLoading, listSize } = sizeList;
  const { loading: mauLoading, listMau } = colorList;

  useEffect(() => {
    if (listNhaCungCap !== undefined) {
      thongTinPhieu[0].options = _.map(listNhaCungCap, (item) => {
        return { value: item.MaNhaCungCap, label: item.TenNhaCungCap };
      });
    }
  }, [listNhaCungCap]);

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

    if (!isCombined || typeof isCombined === "undefined") {
      fetchData();
    } else {
      setProSelector(products);
    }
  }, []);
  useEffect(() => {
    if (!isCombined || typeof isCombined === "undefined") {
      combineData();
    }
  }, [loading]);
  // useEffect(() => {
  //   const fetchCTGIay = async (maGiay) => {
  //     await dispatch(fetchGiaySize(maGiay));
  //   };
  //   if (chosenProduct) {
  //     fetchCTGIay(chosenProduct.MaGiay);
  //   }
  // }, [chosenProduct]);

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
  const setSelectedProduct = (val) => {
    let selectedProduct = { ...listGiay[val] };
    setChosenProduct(selectedProduct);
  };
  const handleAddClick = () => {};
  //handle submit
  const handleSubmitClick = () => {};

  return (
    <div>
      <CssBaseline />
      <label className={classes.titleHeader}>Lập Phiếu Đặt Hàng</label>
      <div>
        <Grid container spacing={0}>
          {/* bill */}
          <Paper className={classes.paper} style={{ width: "20%" }}>
            <IntroField
              GroupBoxes={thongTinPhieuBoxes}
              cardHeader="Thông Tin Phiếu"
              buttonContent="Lập Phiếu"
              disabled="disabled"
              onClick={handleSubmitClick}
            />
          </Paper>
          {/* bill details */}
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
                    {chosenProduct === null ? (
                      <GroupBox
                        type="TextBox"
                        title={CTPHHeadCell[2].label}
                        disabled="disabled"
                      />
                    ) : (
                      <h1>DM</h1>
                    )}
                  </td>
                  {/* <td width="12%">
                    <GroupBox
                      value={amount}
                      type="Number"
                      title={CTPHHeadCell[4].label}
                      onChange={onAmountChange}
                      error={amountError}
                      validationTip={
                        "Số Lượng phải lớn hơn 0 và nhỏ hơn " + maxAmount
                      }
                      disabled={product === null ? "disabled" : ""}
                    />
                  </td> */}
                  <td width="10%">
                    <IconButton
                      style={{ marginBottom: -10 }}
                      aria-label="Add"
                      color="primary"
                      size="small"
                      //disabled={chosenProduct === null ? "disabled" : ""}
                      onClick={handleAddClick}
                    >
                      <AddCircle />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
            </Table>
            <hr className={classes.hr} />
            {/* <TableContainer
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
                          {item.GioiTinh}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {sizes[item.size].TenSize}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.amount}
                        </TableCell>
                        <TableCell component="td" scope="row">
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
              </TableContainer> */}
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default PhieuDatHangForm;
