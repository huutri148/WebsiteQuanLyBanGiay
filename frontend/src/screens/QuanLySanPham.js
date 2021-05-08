import {
  CssBaseline,
  InputAdornment,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { React, useState } from "react";
import useTable from "../components/useTable";
import Input from "../components/controls/Input";
import { Search } from "@material-ui/icons";

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
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80vh",
  },
  tab: {
    margin: theme.spacing(0, 2),
    display: "block",
    float: "left",
    width: "100%",
  },
  tabPaper: {
    margin: theme.spacing(0, 6),
    display: "inline-block",
    float: "left",
  },
  searchInput: {
    width: "75%",
    margin: theme.spacing(4, 6),
  },
  table: {
    width: "80%",
  },
}));

const headCells = [
  { id: "TenGiay", label: "Tên sản phẩm" },
  { id: "TenHangSanXuat", label: "Tên hãng sản xuất", disableSorting: true },
  { id: "TenMau", label: "Tên màu", disableSorting: true },
  { id: "GioiTinh", label: "Giới tính", disableSorting: true },
  { id: "SoLuong", label: "Số lượng" },
];
const QuanLySanPham = () => {
  const [value, setValue] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const [records, setRecords] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

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
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.tabPaper}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Quản lý" />
          <Tab label="Thêm" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Quản lý sản phẩm
          </Typography>
          <Toolbar>
            <Input
              label="Search"
              className={classes.searchInput}
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
          <TblContainer className={classes.table}>
            <TblHead />
          </TblContainer>
        </Paper>
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

export default QuanLySanPham;
