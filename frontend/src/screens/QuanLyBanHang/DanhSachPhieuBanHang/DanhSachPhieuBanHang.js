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
import { green } from '@material-ui/core/colors';
import {
  Search,
  CloudDownload,
  FilterList,
  ViewColumn,
  Edit,
  Print,
  Assignment,
} from "@material-ui/icons";
import Input from "../../../components/controls/Input";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../components/useTable";
import moment from 'moment'
import Popup from "../../../components/controls/Popup";
import Detail from "../../../components/controls/Detail";
import { fetchListPhieuBanHang , fetchListChiTietPhieuBanHang} from "../../../redux/actions/phieuBanHangAction";
import BillToPrint from "../BillToPrint";
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
  { id: "PhuongThucThanhToan", label: "Phương Thức Thanh Toán" },
  { id: "actions", disableSorting: true  },
];
const detailsHeadCells = [
  { id: "TenGiay", label: "Tên Giày" },
  { id: "GioiTinh", label: "Giới Tính" },
  { id: "Size", label: "Size" },
  { id: "DonGia", label: "Đơn Giá" },
  { id: "SoLuong", label: "Số Lượng" },
  { id: "ThanhTien", label: "Thành Tiền" },
  { id: "HanhDong", disableSorting: true  },
];
const DanhSachPhieuBanHang = (props) => {
  // CSS class
  const classes = useStyles();
  //Fetched data
  const dispatch = useDispatch();
  const billList = useSelector((state) => state.ListPhieuBanHang);
  //passing value
  const { loading: phieubanhangLoading, error: phieubanhangError, listPhieuBanHang } = billList;
  //data
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState({});
  //hooks
  const [id, setId] = useState(0);
  const [openPrintPopup, setOpenPrintPopup] = useState(false);
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  // Props in Screens
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(bills, headCells, filterFn);
  const [groupBoxes, setGroupBoxes] = useState([]) ;
  //handle click
  const handleDetailClick = (item) => {
    setGroupBoxes ([
      {
        type: "Label",
        title: "Tên Khách Hàng",
        value: item.TenKhachHang,
      },
      {
        type: "Label",
        title: "Tổng Tiền",
        value: Number(item.TongTien).toLocaleString("it-IT"),
      },
      {
        type: "Label",
        title: "Phương Thức Thanh Toán",
        value: item.PhuongThucThanhToan,
      },
      {
        type: "Label",
        title: "Người Lập",
        value: item.TenNguoiDung,
      },
      {
        type: "Label",
        title: "Ngày Lập",
        value: moment(item.NgayBan).format("DD/MM/YYYY"),
      },
      {
        type: "Label",
        title: "Ghi Chú",
        value: item.GhiChu,
      },
    ]);
    setId(item.SoPhieuBanHang);
    setOpenDetailPopup(true);
  }
  const handlePrintClick = (item) => {
    setGroupBoxes ([
      {
        type: "Label",
        title: "Tên Khách Hàng",
        value: item.TenKhachHang,
      },
      {
        type: "Label",
        title: "Tổng Tiền",
        value: item.TongTien.toLocaleString("it-IT"),
      },
      {
        type: "Label",
        title: "Phương Thức Thanh Toán",
        value: item.PhuongThucThanhToan,
      },
      {
        type: "Label",
        title: "Người Lập",
        value: item.TenNguoiDung,
      },
      {
        type: "Label",
        title: "Ngày Lập",
        value: moment(item.NgayBan).format("DD/MM/YYYY"),
      },
      {
        type: "Label",
        title: "Ghi Chú",
        value: item.GhiChu,
      },
    ]);
    setId(item.SoPhieuBanHang);
    setOpenPrintPopup(true);
  }
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
  // set Bills
  useEffect(() => {
    if (listPhieuBanHang != undefined) 
    {
      const billsData = Object.values(listPhieuBanHang).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);
      setBills(billsData);
    }
  }, [listPhieuBanHang]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListPhieuBanHang());
    };
    fetchData();
  }, [dispatch]);
    return (
    <>
      {bills === [] || bills === undefined ? (<h1>Loading</h1>) 
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
                        {item.PhuongThucThanhToan}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="Xem chi tiết">
                          <IconButton onClick = {() => handleDetailClick(item)}>
                            <Assignment color="primary"/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="In Phiếu">
                          <IconButton onClick = {() => handlePrintClick(item)}>
                            <Print style={{ color: green[500] }}/>
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
          <Popup
            title="Thông Tin Phiếu Bán Hàng"
            openPopup={openDetailPopup}
            setOpenPopup={setOpenDetailPopup}>
            <Detail 
              type = "bill" 
              id = {id}
              header = "Phiếu Bán Hàng"
              detailHeader = "Chi Tiết Phiếu Bán Hàng"
              headCells = {detailsHeadCells}
              groupBoxes = {groupBoxes}/>
          </Popup>
          <Popup
            title="In Phiếu Bán Hàng"
            openPopup={openPrintPopup}
            setOpenPopup={setOpenPrintPopup}>
              <BillToPrint 
                 id = {id}
                 groupBoxes = {groupBoxes}
              />
          </Popup>
        </div>
      )}
    </>
  );
};

export default DanhSachPhieuBanHang;
