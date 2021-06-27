import {
  CssBaseline,
  Paper,
  Button,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Toolbar,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import {
  Add,
  Print,
  Assignment,
} from "@material-ui/icons";
import moment from 'moment';
import { React, useState, useEffect } from "react";
import "../QuanLyBanHang/QuanLyBanHang.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loadable/Loading";
import useTable from "../../components/useTable";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import Popup from "../../components/controls/Popup";
import { fetchListBaoCaoBanHang, fetchListChiTietBaoCaoBanHang, createBaoCaoBanHang } from "../../redux/actions/baoCaoBanHangAction";
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
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: "fit-content",
  },
  tabHeader: {
    textTransform: "none",
  },
  titleHeader: {
    padding: theme.spacing(4, 0),
    textTransform: "none",
    fontSize: 32,
    color: "darkslateblue",
    fontWeight: "500",
  },
  newButton: {
    position: "absolute",
    right: "10%",
    color: green[500],
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
}));
const headCells = [
  { id: "MaBaoCaoBanHang", label: "Mã Báo Cáo Bán Hàng" },
  { id: "NguoiLap", label: "Người Lập" },
  { id: "NgayBatDau", label: "Ngày Bắt Đầu" },
  { id: "NgayKetThuc", label: "Ngày Kết Thúc" },
  { id: "SoLuongPhieuBanHang", label: "Số Lượng Phiếu Bán Hàng" },
  { id: "TongDoanhThu", label: "Tổng Doanh Thu" },
  { id: "actions", disableSorting: true },
];
const BaoCaoBanHang = () => {
  //styles
  const classes = useStyles();
  //Fetched data
  const dispatch = useDispatch();
  const reportList = useSelector((state) => state.ListBaoCaoBanHang);
  const { loading, error, listBaoCaoBanHang } = reportList;
  const detailList = useSelector((state) => state.ListChiTietBaoCaoBanHang);
  const { listChiTietBaoCaoBanHang } = detailList;
  const user = useSelector((state) => state.User);
  const { userInfo } = user;
  //variables
  const [reports, setReports] = useState([]);
  const [details, setDetails] = useState([]);
  const [report, setReport] = useState({});
  const [createReport, setCreateReport] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  const [update, setUpdate] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  //handle
  const handleAdd = () => {
    setCreateReport({});
    setOpenAddPopup(true);
  };
  const handleDetail = (item) => {
    setOpenDetailPopup(true);
    setReport(item);
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(reports, headCells, filterFn);

  useEffect(() => {
    if (listBaoCaoBanHang != undefined) {
      const data = Object.values(listBaoCaoBanHang).reduce((result, value) => {
        result.push({ ...value });
        setReports(result);
        return result;
      }, []);
    }
  }, [listBaoCaoBanHang]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListBaoCaoBanHang());
    };
    fetchData();
  }, [dispatch, update]);

  useEffect(() => {
    if (listChiTietBaoCaoBanHang != undefined) {
      const data = Object.values(listChiTietBaoCaoBanHang).reduce((result, value) => {
        result.push({ ...value });
        setDetails(result);
        console.log(result);
        return result;
      }, []);
    }
  }, [listChiTietBaoCaoBanHang]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (report.MaBaoCaoBanHang !== undefined)
        dispatch(fetchListChiTietBaoCaoBanHang(report.MaBaoCaoBanHang));
    };
    fetchData();
  }, [dispatch, report]);
  const print = () => {
    var toPrint = document.getElementById('content');

    var popupWin = window.open('', '_blank', 'width=600,height=1000'); //create new page     
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
  return (
    <>
      {false ?
        <Loading />
        :
        <div className={classes.root}>
          <CssBaseline />
          <Typography component="h1" variant="h5" className={classes.titleHeader}>
            Danh Sách Báo Cáo Bán Hàng
          </Typography>
          <Paper className={classes.paper}>
            <Toolbar className={classes.content}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                className={classes.newButton}
                onClick={() => handleAdd()}
              >
                Thêm Mới
              </Button>
            </Toolbar>
            <TableContainer className={classes.table}>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow
                      key={item.MaBaoCaoBanHang}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {item.MaBaoCaoBanHang}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNguoiDung}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {moment(item.NgayBatDau).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {moment(item.NgayKetThuc).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.SoLuongPhieuBanHang}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {Number(item.TongDoanhThu).toLocaleString("it-IT")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="Xem chi tiết">
                          <IconButton onClick={() => handleDetail(item)}>
                            <Assignment color="primary" />
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
            title="Chi Tiết Báo Cáo"
            openPopup={openDetailPopup}
            setOpenPopup={setOpenDetailPopup}
          >
            <div id="content">
              <div style={{ display: 'inline-block' }}>
                <li><b>Cửa Hàng Giày SneakerLand</b></li>
                <li>Địa chỉ: 29N1, Tân Lập, Đông Hoà, Dĩ An, Bình Dương</li>
                <li>Số Điện Thoại: 01212801223</li>
              </div>
              <h1 style={{ flexGrow: 1, textAlign: "center" }}>Báo Cáo Bán Hàng</h1>
              <table>
                <tr>
                  <td><b>Mã Báo Cáo:&nbsp;&nbsp;</b>{report.MaBaoCaoBanHang}</td>
                  <td><b>Người Lập:&nbsp;&nbsp;</b>{report.TenNguoiDung}</td>
                </tr>
                <tr>
                  <td><b>Ngày Bắt Đầu:&nbsp;&nbsp;</b>{moment(report.NgayBatDau).format("DD/MM/YYYY")}</td>
                  <td><b>Ngày Kết Thúc:&nbsp;&nbsp;</b>{moment(report.NgayKetThuc).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td><b>Số Lượng Phiếu Bán Hàng:&nbsp;&nbsp;</b>{report.SoLuongPhieuBanHang}</td>
                  <td><b>Tổng Doanh Thu:&nbsp;&nbsp;</b>{Number(report.TongDoanhThu).toLocaleString("it-IT")}</td>
                </tr>
              </table>
              <br />
              <b>Chi Tiết Báo Cáo</b>
              <br />
              <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <th style={{ padding: "0px 10px", border: "1px solid black" }}>
                      Ngày
                    </th>
                    <th style={{ padding: "0px 10px", border: "1px solid black" }}>
                      Số Lượng Phiếu Bán
                    </th>
                    <th style={{ padding: "0px 10px", border: "1px solid black" }}>
                      Doanh Thu
                    </th>
                  </tr>
                  {details.map(item => (
                    <tr>
                      <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                        {moment(item.Ngay).format("DD/MM/YYYY")}
                      </td>
                      <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                        {item.SoLuongPhieuBan}
                      </td>
                      <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                        {Number(item.DoanhThu).toLocaleString("it-IT")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <br />
              </table>
            </div>
            <Tooltip title="In">
                    <IconButton onClick = {() => print()}>
                        <Print style={{ color: green[500] }}/>
                    </IconButton>
            </Tooltip>
          </Popup>
          <Popup
            title="Lập Báo Cáo"
            openPopup={openAddPopup}
            setOpenPopup={setOpenAddPopup}
          >
            <GroupBox
              type="Picker"
              title="Ngày Bắt Đầu"
              onChange={(e) => { createReport.NgayBatDau = e.target.value }}
            />
            <GroupBox
              type="Picker"
              title="Ngày Kết Thúc"
              onChange={(e) => { createReport.NgayKetThuc = e.target.value }}
            />
            <GroupBox
              type="TextBox"
              title="Người Lập"
              disabled="disabled"
              value={userInfo.TenNguoiDung}
            />
            <br />
            <div style={{ textAlign: "center" }}>
              <Button size="large" variant="contained" color="primary"
                onClick={() => {
                  createReport.MaNguoiDung = userInfo.MaNguoiDung;
                  var now = moment(Date.now()).format("YYYY-MM-DD");
                  if (createReport.NgayBatDau === undefined)
                    createReport.NgayBatDau = now;
                  if (createReport.NgayKetThuc === undefined)
                    createReport.NgayKetThuc = now;
                  dispatch(createBaoCaoBanHang(createReport))
                    .then(setUpdate(!update))
                    .then(setOpenAddPopup(false));
                }}>
                Lưu Thay Đổi
              </Button>
            </div>
          </Popup>
        </div>
      }
    </>
  );
};

export default BaoCaoBanHang;
