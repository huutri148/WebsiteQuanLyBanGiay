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
  Tooltip,
} from "@material-ui/core";

import styles from "./styles";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import {
  Search,
  Assignment,
  Edit,
  CloudDownload,
  Print,
  FilterList,
  PrintDisabledRounded,
  ViewColumn,
} from "@material-ui/icons";
import { CSVLink } from "react-csv";
import ProductCard from "../ProductCard";
import Popup from "../../../components/controls/Popup";
import ProductDetail from "../ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchListGiay } from "../../../redux/actions/giayAction";
import { DSSPHeadCells } from "../ThongTinQuanLySanPham";
import Loading from "../../../components/Loadable/Loading";

const DanhSachSanPham = (props) => {
  // CSS class
  const { classes } = props;

  //Fetched data
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.ListGiay);
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const mauList = useSelector((state) => state.ListMau);

  const { loading: productLoading, error: giayError, listGiay } = productList;
  const { listHangSanXuat } = brandList;
  const { listMau } = mauList;

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
    useTable(tableData, DSSPHeadCells, filterFn);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListGiay());
      //set Flag to combine TableData
      // Note: Find a way to select lastest data
      // Done have to use Flag
      setLoading(!loading);
    };
    if (typeof productLoading === "undefined") fetchData();
  }, [dispatch]);

  // setTableData when done fetching
  useEffect(() => {
    const data = Object.values(listGiay).reduce((result, value) => {
      let maHSX = value.MaHangSanXuat;
      let maMau = value.MaMau;
      if (typeof listHangSanXuat[maHSX] === "undefined") return [];
      if (typeof listMau[maMau] === "undefined") return [];
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

  const handleDetail = (index, data) => {
    setSelectedItem(data);
    console.log(data);
    setOpenPopup(true);
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) => {
            return x.TenGiay.toLowerCase().includes(target.value);
          });
      },
    });
  };

  return (
    <div>
      <Typography component="h1" variant="h5" className={classes.title}>
        Qu???n l?? s???n ph???m
      </Typography>
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.searchInput}>
            <Input
              label="Search"
              style={{ marginTop: "30px" }}
              fullWidth="true"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </div>
          <div className={classes.actions}>
            <Tooltip title="T???i file csv">
              <CSVLink data={tableData} filename={"DS-SanPham.csv"}>
                <IconButton className={classes.actionsButton}>
                  <CloudDownload />
                </IconButton>
              </CSVLink>
            </Tooltip>
            <Tooltip title="In">
              <IconButton className={classes.actionsButton}>
                <Print />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
        {productLoading ? (
          <Loading />
        ) : giayError ? (
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
                        imgUrl={item.Anh}
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
                              item.TongSoLuong > 150 &&
                              "#08ad6c ") ||
                            (item.IsDeleted === 0 &&
                              item.TongSoLuong <= 150 &&
                              "#FFAF38") ||
                            (item.IsDeleted === 1 && "#FF3D57 "),
                          boxShadow: " 0 2px 2px 1px rgba(0,0,0,0.24)",
                        }}
                      >
                        {item.IsDeleted === 0
                          ? item.TongSoLuong > 150
                            ? "C??n h??ng"
                            : "Ch??? h??ng"
                          : "H???t h??ng"}
                      </Typography>
                    </TableCell>

                    <TableCell component="th" scope="row">
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
        title="Th??ng tin s???n ph???m"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductDetail item={selectedItem} />
      </Popup>
    </div>
  );
};

export default withStyles(styles)(DanhSachSanPham);
