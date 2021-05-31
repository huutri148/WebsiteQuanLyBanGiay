import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  Paper,
  Toolbar,
  TableBody,
  withStyles,
  TableContainer,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import styles from "./styles";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import { Search, Assignment, Edit } from "@material-ui/icons";
import ProductCard from "../ProductCard";
import Popup from "../../../components/controls/Popup";
import ProductDetail from "../ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchListGiay } from "./../../../actions/giayAction";
import { fetchListHangSanXuat } from "./../../../actions/hangSanXuatAction";
import { fetchListSize } from "./../../../actions/sizeAction";
import { fetchListMau } from "./../../../actions/mauAction";

const headCells = [
  { id: "TenGiay", label: "Tên sản phẩm" },
  { id: "TenMau", label: "Tên màu", disableSorting: true },
  { id: "GioiTinh", label: "Giới tính", disableSorting: true },
  { id: "SoLuong", label: "Số lượng" },
  { id: "IsDeleted", label: "Trạng Thái" },
  { id: "actions" },
];
const DanhSachSanPham = (props) => {
  // CSS class
  const { classes } = props;

  //Fetched data
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.ListGiay);
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const mauList = useSelector((state) => state.ListMau);
  const {
    loading: brandLoading,
    error: hangSanXuatError,
    listHangSanXuat,
  } = brandList;
  const { loading: productLoading, error: giayError, listGiay } = productList;
  const { loading: sizeLoading, error: sizeError, listSize } = sizeList;
  const { loading: mauLoading, error: mauError, listMau } = mauList;

  // Props in Screens
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState();
  const [selectedItem, setSelectedItem] = useState(tableData[0]);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(tableData, headCells, filterFn);

  // setTableData when done fetching
  useEffect(() => {
    console.log("Combine");
    const data = Object.values(listGiay).reduce((result, value) => {
      let maHSX = value.MaHangSanXuat;
      let maMau = value.MaMau;
      if (typeof listHangSanXuat[maHSX] === "undefined") return [];
      let { TenHangSanXuat } = listHangSanXuat[maHSX];
      let { TenMau } = listMau[maMau];
      result.push({
        TenHangSanXuat,
        TenMau,
        ...value,
      });
      return result;
    }, []);
    setTableData(data);
  }, [loading]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetch");
      await dispatch(fetchListGiay());
      await dispatch(fetchListHangSanXuat());
      await dispatch(fetchListMau());
      await dispatch(fetchListSize());
      //set Flag to combine TableData
      // Note: Find a way to select lastest data
      // Done have to use Flag
      setLoading(!loading);
    };
    fetchData();
  }, [dispatch]);

  const handleDetail = (index, data) => {
    setSelectedItem(data);
    setOpenPopup(true);
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <div>
      <Typography component="h1" variant="h5" className={classes.title}>
        Quản lý sản phẩm
      </Typography>
      <Paper>
        <Toolbar className={classes.searchInput}>
          <Input
            label="Search"
            style={{ marginTop: "30px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {sizeLoading || productLoading || brandLoading ? (
          <CircularProgress disableShrink style={{ margin: "0px 16px" }} />
        ) : sizeError || giayError || hangSanXuatError ? (
          <h1>Error</h1>
        ) : (
          <TableContainer className={classes.table}>
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
                    <TableCell component="th" scope="row">
                      <ProductCard
                        imgUrl={`/images/${item.Anh}`}
                        PrimaryText={item.TenGiay}
                        SecondaryText={item.TenHangSanXuat}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.TenMau}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.GioiTinh}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.TongSoLuong}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        className={classes.status}
                        style={{
                          backgroundColor:
                            //Note: Fix hardcode 100
                            (item.IsDeleted === 0 &&
                              item.TongSoLuong > 100 &&
                              "green") ||
                            (item.IsDeleted === 0 &&
                              item.TongSoLuong <= 100 &&
                              "blue") ||
                            (item.IsDeleted === 1 && "red"),
                        }}
                      >
                        {item.IsDeleted === 0 ? "Avaiable" : "IsDeleted"}
                      </Typography>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <IconButton color="secondary">
                        <Edit />
                      </IconButton>
                      <IconButton color="primary">
                        <Assignment onClick={() => handleDetail(index, item)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </TableContainer>
        )}
      </Paper>
      <Popup
        title="Thông tin sản phẩm"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductDetail item={selectedItem} ListSize={listSize} />
      </Popup>
    </div>
  );
};

export default withStyles(styles)(DanhSachSanPham);
