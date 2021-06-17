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
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import {
  Search,
  Check,
  Clear,
  CloudDownload,
  Print,
  FilterList,
  PrintDisabledRounded,
  Assignment,
  ViewColumn,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import {
  fetchListGioHang,
  updateGioHang,
  deleteGioHang,
} from "../../../redux/actions/gioHangAction";
import { fetchListNguoiDung } from "../../../redux/actions/nguoiDungAction";
import { DSGHHeadCell } from "../ThongTinQuanLyGioHang";
import ConfirmDialog from "../../../components/controls/ConfirmDialog";
import Popup from "../../../components/controls/Popup";
import Detail from "../../QuanLyBanHang/Detail";
import { detailsHeadCells } from "../ThongTinQuanLyGioHang";
import Loading from "../../../components/Loadable/Loading";
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

const DanhSachGioHang = (props) => {
  // CSS class
  const classes = useStyles();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.ListNguoiDung);
  const cartList = useSelector((state) => state.ListGioHang);
  const { loading: userLoading, listNguoiDung } = userList;
  const { loading: cartLoading, listGioHang } = cartList;

  // Props in Screens
  const [tableData, setTableData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [groupBoxes, setGroupBoxes] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  const [openPrintPopup, setOpenPrintPopup] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(tableData, DSGHHeadCell, filterFn);

  useEffect(() => {
    const combineData = () => {
      const data = Object.values(listGioHang).reduce((result, value) => {
        let maNguoiDung = value.MaNguoiDung;
        if (typeof listNguoiDung[maNguoiDung] === "undefined") return [];
        let { TenNguoiDung } = listNguoiDung[maNguoiDung];
        const date = moment(value.NgayLap).format("DD/MM/YYYY");
        result.push({
          ...value,
          TenNguoiDung,
          NgayLap: date,
        });
        return result;
      }, []);
      setTableData(data);
    };
    combineData();
  }, [listNguoiDung, listGioHang]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListGioHang());
    };
    fetchData();
  }, [updateData]);

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(fetchListNguoiDung());
    };
    if (typeof userLoading === "undefined") fetchUserData();
  }, []);

  const handleDetail = (item) => {
    setGroupBoxes([
      {
        type: "Label",
        title: "Tên Khách Hàng",
        value: item.TenNguoiDung,
      },
      {
        type: "Label",
        title: "Tổng Tiền",
        value: item.TongTien.toLocaleString("it-IT"),
      },
      {
        type: "Label",
        title: "Ngày Lập",
        value: moment(item.NgayBan).format("DD/MM/YYYY"),
      },
    ]);
    setSelectedItem(item.MaGioHang);
    setOpenDetailPopup(true);
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.TenNguoiDung.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const handleDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Bạn có muốn xóa đơn hàng không?",
      onConfirm: () => {
        deletePhieu(item);
      },
    });
  };

  const handleConfirm = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Bạn có muốn xác nhận đơn hàng không?",
      onConfirm: () => {
        confirmDonHang(item);
      },
    });
  };
  const deletePhieu = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteGioHang(item.MaGioHang));
    setUpdateData(!updateData);
  };
  const confirmDonHang = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(updateGioHang(item.MaGioHang));
    setUpdateData(!updateData);
  };

  const handlePrintClick = (item) => {
    setOpenPrintPopup(true);
    setOpenDetailPopup(false);
  };
  return (
    <>
      {userLoading || cartLoading ? (
        <Loading />
      ) : (
        <div>
          <Typography component="h1" variant="h5" className={classes.title}>
            Quản lý giỏ hàng
          </Typography>
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
                      key={item.SoPhieuDatHang}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {item.MaGioHang}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNguoiDung}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.NgayLap}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography
                          className={classes.status}
                          style={{
                            backgroundColor: item.IsDeleted
                              ? "#FF3D57"
                              : (item.TrangThai === "Đã giao hàng" &&
                                  "rgba(9,182,109,1)") ||
                                (item.TrangThai === "Đang xử lý" && "#FFAF38"),
                            boxShadow: " 0 2px 2px 1px rgba(0,0,0,0.24)",
                          }}
                        >
                          {item.TrangThai}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TongTien.toLocaleString("it-IT")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="Xác nhận">
                          <IconButton
                            onClick={() => handleConfirm(item)}
                            disabled={
                              item.IsDeleted === true ||
                              item.TrangThai === "Đã giao hàng" ||
                              item.TrangThai === "Đã hủy"
                            }
                          >
                            <Check
                              className={
                                item.IsDeleted === true ||
                                item.TrangThai === "Đã giao hàng" ||
                                item.TrangThai === "Đã hủy"
                                  ? ""
                                  : classes.checkButton
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hủy đơn">
                          <IconButton
                            onClick={() => handleDelete(item)}
                            disabled={
                              item.IsDeleted === true ||
                              item.TrangThai === "Đã giao hàng" ||
                              item.TrangThai === "Đã hủy"
                            }
                          >
                            <Clear
                              className={
                                item.IsDeleted === true ||
                                item.TrangThai === "Đã giao hàng" ||
                                item.TrangThai === "Đã hủy"
                                  ? ""
                                  : classes.cancelButton
                              }
                            />
                          </IconButton>
                        </Tooltip>
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
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
            <Popup
              title="Thông Tin Phiếu Bán Hàng"
              openPopup={openDetailPopup}
              setOpenPopup={setOpenDetailPopup}
            >
              <Detail
                type="cart"
                id={selectedItem}
                header="Giỏ hàng"
                headCells={detailsHeadCells}
                groupBoxes={groupBoxes}
                Print={handlePrintClick}
              />
            </Popup>
            <Popup
              title="In Phiếu Bán Hàng"
              openPopup={openPrintPopup}
              setOpenPopup={setOpenPrintPopup}
            >
              <BillToPrint id={selectedItem} groupBoxes={groupBoxes} />
            </Popup>
          </Paper>
        </div>
      )}
    </>
  );
};

export default DanhSachGioHang;
