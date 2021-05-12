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
} from "@material-ui/core";
import styles from "./styles";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import { Search, Assignment, Edit } from "@material-ui/icons";
import ProductCard from "../ProductCard";
import Popup from "../../../components/controls/Popup";
import ProductDetail from "../ProductDetail";
import { useDispatch } from "react-redux";
import { fetchListGiay } from "./../../../actions/giayAction";

const products = [
  {
    MaGiay: 1,
    TenGiay: "Van Old Skool Violet",
    TenHangSanXuat: "Nike",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/2.jpg",
    SoLuong: 20,
    GiaNhap: 100,
  },
  {
    MaGiay: 3,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    GiaNhap: 100,
  },
  {
    MaGiay: 2,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    GiaNhap: 100000,
  },
  {
    MaGiay: 4,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    GiaNhap: 100000,
  },
  {
    MaGiay: 5,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    GiaNhap: 100000,
  },
  {
    MaGiay: 6,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    GiaNhap: 100000,
  },
  {
    MaGiay: 7,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    GiaNhap: 100,
  },
];
const headCells = [
  { id: "TenGiay", label: "Tên sản phẩm" },
  { id: "TenHangSanXuat", label: "Tên hãng sản xuất", disableSorting: true },
  { id: "TenMau", label: "Tên màu", disableSorting: true },
  { id: "GioiTinh", label: "Giới tính", disableSorting: true },
  { id: "SoLuong", label: "Số lượng" },
  { id: "actions" },
];
const DanhSachSanPham = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [records, setRecords] = useState(products);
  const [product, setProduct] = useState(products[0]);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  useEffect(() => {
    dispatch(fetchListGiay());
  }, [dispatch]);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  const handleDetail = (index, data) => {
    setProduct(data);
    setOpenPopup(true);
  };
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
        <TableContainer className={classes.table}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow
                  key={item.MaGiay}
                  style={
                    index % 2 ? { background: "#eee" } : { background: "white" }
                  }
                >
                  <TableCell component="th" scope="row">
                    <ProductCard imgUrl={item.Anh} productName={item.TenGiay} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.TenHangSanXuat}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.TenMau}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.GioiTinh}
                  </TableCell>
                  <TableCell>{item.SoLuong}</TableCell>
                  <TableCell>
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
      </Paper>
      <Popup
        title="Thông tin sản phẩm"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductDetail item={product} />
      </Popup>
    </div>
  );
};

export default withStyles(styles)(DanhSachSanPham);
