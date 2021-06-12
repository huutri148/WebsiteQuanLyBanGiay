import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  Paper,
  Toolbar,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import Input from "../../../components/controls/Input";
import {
  Search,
  ArrowRightAlt,
  CloudDownload,
  Print,
  FilterList,
  ViewColumn,
  Edit,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import useTable from "../../../components/useTable";
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0),
    textTransform: "none",
    fontSize: 32,
    color: "darkslateblue",
    fontWeight: "Bold",
  },
  toolbar: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    padding: theme.spacing(0, 8),
  },
  table: {
    padding: theme.spacing(0, 8),
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  checkButton: {
    color: "#08ad6c",
  },
  cancelButton: {
    color: "#FF3D57",
  },
  actions: {
    flex: "1 1 auto",
    textAlign: "right",
    marginTop: "30px",
  },
  searchInput: {
    flex: "1 1 auto",
  },
  actionsButton: {
    "&:hover, &.Mui-focusVisible": { color: "#1976d2" },
  },
}));

const headCells = [
  { id: "SoPhieuBanHang", label: "Số phiếu" },
  { id: "TenKhachHang", label: "Người mua", disableSorting: true },
  { id: "NgayBan", label: "Ngày lập" },
  { id: "TenNguoiDung", label: "Người lập", disableSorting: true },
  { id: "TongTien", label: "Tổng Tiền" },
  { id: "actions" },
];
const DanhSachPhieuBanHang = (props) => {
  // CSS class
  const classes = useStyles();
  //props
  const {bills} = props;
  //hooks
  // Props in Screens
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(bills, headCells, filterFn);
  const handleDetail = (index, data) => {};
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
    <>
      {bills === [] ? (<h1>Loading</h1>) 
        : 
        (
        <div>
          <Paper>
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
                <Tooltip title="Tải file csv">
                  <IconButton className={classes.actionsButton}>
                    <CloudDownload />
                  </IconButton>
                </Tooltip>
                <Tooltip title="In">
                  <IconButton className={classes.actionsButton}>
                    <Print />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Chọn cột">
                  <IconButton className={classes.actionsButton}>
                    <ViewColumn />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Lọc">
                  <IconButton className={classes.actionsButton}>
                    <FilterList />
                  </IconButton>
                </Tooltip>
              </div>
            </Toolbar>
            <TableContainer className={classes.table}>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow
                      key={item.SoPhieuBanHang}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {item.SoPhieuBanHang}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNguoiDung}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {moment(item.NgayBan).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenKhachHang}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TongTien.toLocaleString("it-IT")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="Chỉnh sửa">
                          <IconButton >
                            <Edit color="primary"/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xem chi tiết">
                          <IconButton>
                            <ArrowRightAlt />
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
        </div>
      )}
    </>
  );
};

export default DanhSachPhieuBanHang;
