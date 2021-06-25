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
  Button,
  Typography
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import {
  Search,
  CloudDownload,
  FilterList,
  ViewColumn,
  Edit,
  Check,
  Print,
  Assignment,
  Delete,
} from "@material-ui/icons";
import Input from "../../../components/controls/Input";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../components/useTable";
import moment from 'moment'
import Popup from "../../../components/controls/Popup";
import { fetchListPhieuChi} from "../../../redux/actions/phieuChiAction";
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
  { id: "SoPhieuChi", label: "Số phiếu chi" },
  { id: "NgayChi", label: "Ngày Lập" },
  { id: "TenNhaCungCap", label: "Tên Nhà Cung Cấp" },
  { id: "TongTien", label: "Tổng Tiền" },
  { id: "TenNguoiDung", label: "Người lập"},
  { id: "SoPhieuNhapKho", label: "Số phiếu nhập kho" },
  { id: "actions", disableSorting: true  },
];
const DanhSachPhieuChi = (props) => {
  // CSS class
  const classes = useStyles();
  //Fetched data
  const dispatch = useDispatch();
  const paymentList = useSelector((state) => state.ListPhieuChi);
  //passing value
  const { loading: phieuChiLoading, error: phieuChiError, listPhieuChi } = paymentList;
  //data
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({});
  //hooks
  const [openPrintPopup, setOpenPrintPopup] = useState(false);
  // Props in Screens
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(payments, headCells, filterFn);
  //handle click
  const handlePrintClick = (item) => {
    setPayment(item);
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
  const print = (item) => {
    setPayment(item);
    var toPrint = document.getElementById('content');

    var popupWin = window.open('', '_blank', 'width=500,height=1000'); //create new page     
    popupWin.document.open(); //open new page
    popupWin.document.write('<html><body onload="window.print()">')

    popupWin.document.write(toPrint.innerHTML);
    popupWin.document.write('')
    popupWin.document.write('<p style="text-align:right; padding-right: 50px">')
    popupWin.document.write(', Ngày .... Tháng .... Năm ....')
    popupWin.document.write('<br>')
    popupWin.document.write('</p>')
    popupWin.document.write('<p style="text-align:center;float: right;margin-right: 125px;margin-top: -10px;">')
    popupWin.document.write('Nhân viên')
    popupWin.document.write('<br>')
    popupWin.document.write('(Ký tên)')
    popupWin.document.write('</p>')
    popupWin.document.write('</body></html>');
    popupWin.document.close();
}
  // set payments
  useEffect(() => {
    if (listPhieuChi != undefined) 
    {
      const paymentsData = Object.values(listPhieuChi).reduce((result, value) => {
        result.push({
          ...value,
          IsDeleted: false
        });
        return result;
      }, []);
      setPayments(paymentsData);
    }
  }, [listPhieuChi]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListPhieuChi());
    };
    fetchData();
  }, [dispatch]);
    return (
    <>
      {payments === [] || payments === undefined ? (<h1>Loading</h1>) 
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
                      key={item.SoPhieuChi}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {item.SoPhieuChi}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {moment(item.NgayLap).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNhaCungCap}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TongTien.toLocaleString("it-IT")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNguoiDung}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.SoPhieuNhapKho}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="In Phiếu">
                          <IconButton onClick = {() => print(item)}>
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
          <div style = {{display: "none"}}>
            <div id="content">
              <div style={{ display: 'inline-block' }}>
                <li><b>Cửa Hàng Giày SneakerLand</b></li>
                <li>Địa chỉ: 29N1, Tân Lập, Đông Hoà, Dĩ An, Bình Dương</li>
                <li>Số Điện Thoại: 01212801223</li>
                </div>
                <div>
                  <h1 style={{ flexGrow: 1, textAlign: "center" }}>Phiếu Chi</h1>
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <tr>
                        <td><b>Số Phiếu Chi:&nbsp;&nbsp;</b>{payment.SoPhieuChi}</td>
                    </tr>
                    <tr>
                        <td><b>Số Phiếu Nhập Kho:&nbsp;&nbsp;</b>{payment.SoPhieuNhapKho}</td>
                        <td><b>Nhà Cung Cấp:&nbsp;&nbsp;</b>{payment.TenNhaCungCap}</td>
                    </tr>
                    <tr>
                        <td><b>Tổng Tiền:&nbsp;&nbsp;</b>{Number(payment.TongTien).toLocaleString("it-IT")}</td>
                        <td><b>Người Lập:&nbsp;&nbsp;</b>{payment.TenNguoiDung}</td>
                    </tr>
                    <tr>
                        <td><b>Ngày Lập:&nbsp;&nbsp;</b>{moment(payment.NgayLap).format("DD/MM/YYYY")}</td>
                        <td><b>Ghi Chú:&nbsp;&nbsp;</b>{payment.GhiChu}</td>
                    </tr>
                  </table>
                </div>
                <br />
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DanhSachPhieuChi;
