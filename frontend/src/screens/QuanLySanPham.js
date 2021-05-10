import {
  CssBaseline,
  InputAdornment,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Button,
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
    margin: theme.spacing(2, 2),
    display: "block",
    float: "left",
    width: "100%",
  },
  tabPaper: {
    display: "inline-block",
    float: "left",
  },
  searchInput: {
    width: "75%",
    margin: theme.spacing(4, 6),
  },
  table: {
    width: "80%",
    margin: theme.spacing(4, 6),
  },
}));

const getStripedStyle = (index) => {
  return { background: index % 2 ? "#fafafa" : "white" };
};
const products = [
  {
    MaGiay: 1,
    TenGiay: "Van Old Skool Violet",
    TenHangSanXuat: "Nike",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    SoLuong: 20,
  },
  {
    MaGiay: 3,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    SoLuong: 20,
  },
  {
    MaGiay: 2,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    SoLuong: 20,
  },
  {
    MaGiay: 4,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    SoLuong: 20,
  },
  {
    MaGiay: 5,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    SoLuong: 20,
  },
];
const headCells = [
  { id: "TenGiay", label: "Tên sản phẩm" },
  { id: "TenHangSanXuat", label: "Tên hãng sản xuất", disableSorting: true },
  { id: "TenMau", label: "Tên màu", disableSorting: true },
  { id: "GioiTinh", label: "Giới tính", disableSorting: true },
  { id: "SoLuong", label: "Số lượng" },
  { id: "actions", label: "Actions" },
];
const QuanLySanPham = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const [records, setRecords] = useState(products);
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
      <div>
      <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Quản lý" />
          <Tab label="Thêm" />
        </Tabs>
      </div>
      <Typography
          style = {{fontSize: 32, color: "#2e3b44"}}
          component="h1" variant="h5">
            {value == 0 ? 'Quản Lý Sản Phẩm' : 'Thêm Sản Phẩm'} 
      </Typography>
      <TabPanel value={value} index={0}>
        <Paper className={classes.paper}>
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
          <TableContainer className={classes.table}>
            <TblContainer >
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.MaGiay}>
                    <TableCell component="th"  scope="row">{item.TenGiay}</TableCell>
                    <TableCell component="th"  scope="row">{item.TenHangSanXuat}</TableCell>
                    <TableCell component="th"  scope="row">{item.TenMau}</TableCell>
                    <TableCell component="th"  scope="row">{item.GioiTinh}</TableCell>
                    <TableCell >{item.SoLuong}</TableCell>
                    <TableCell>
                      <Button aria-label="edit">Edit</Button>                      
                      <Button aria-label="detail">Detail</Button>                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
          </TableContainer>
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
