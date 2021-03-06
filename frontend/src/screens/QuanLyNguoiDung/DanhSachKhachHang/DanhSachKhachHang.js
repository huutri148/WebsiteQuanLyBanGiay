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
  Typography,
  CircularProgress,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import {
  Search,
  Assignment,
  CloudDownload,
  Print,
  ViewColumn,
  FilterList,
} from "@material-ui/icons";
import UserCard from "../UserCard";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import { fetchListKhachHang } from "../../../redux/actions/nguoiDungAction";
import { KHHeadCell } from "../ThongTinQuanLyNguoiDung";
import Loading from "../../../components/Loadable/Loading";

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
  paper: {
    margin: theme.spacing(0, 4),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: "fit-content",
  },
}));

const DanhSachKhachHang = (props) => {
  // CSS class
  const classes = useStyles();

  //Fetched data
  const dispatch = useDispatch();
  const customerList = useSelector((state) => state.ListKhachHang);
  const { loading: customerLoading, listKhachHang } = customerList;

  // Props in Screens
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(tableData, KHHeadCell, filterFn);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListKhachHang());
      setLoading(!loading);
    };
    if (typeof customerLoading === "undefined") fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (typeof listKhachHang !== "undefined") {
      const list = _.map(listKhachHang, (value) => {
        return value;
      });
      setTableData(list);
    }
  }, [loading]);

  const handleDetail = (index, data) => {};
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) => {
            return x.TenNguoiDung.toLowerCase().includes(target.value);
          });
      },
    });
  };

  return (
    <>
      {customerLoading ? (
        <Loading />
      ) : (
        <div>
          <Typography component="h1" variant="h5" className={classes.title}>
            Danh s??ch kh??ch h??ng
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
                  <IconButton className={classes.actionsButton}>
                    <CloudDownload />
                  </IconButton>
                </Tooltip>
                <Tooltip title="In">
                  <IconButton className={classes.actionsButton}>
                    <Print />
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
                      key={item.MaNguoiDung}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        <UserCard
                          imgUrl={item.Avatar}
                          PrimaryText={item.TenNguoiDung}
                          SecondaryText={item.Email}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.SDT}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.Email}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Tooltip title="Chi ti???t">
                          <IconButton color="primary">
                            <Assignment onClick={() => handleDetail(item)} />
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

export default DanhSachKhachHang;
