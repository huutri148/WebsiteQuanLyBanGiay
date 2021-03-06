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
  fetchListChiTietGioHang,
} from "../../../redux/actions/gioHangAction";
import { fetchListNguoiDung } from "../../../redux/actions/nguoiDungAction";
import { createPhieuBanHang } from "../../../redux/actions/phieuBanHangAction";
import { DSGHHeadCell, DSGHHeaderCSV } from "../ThongTinQuanLyGioHang";
import ConfirmDialog from "../../../components/controls/ConfirmDialog";
import Popup from "../../../components/controls/Popup";
import Detail from "../../../components/controls/Detail";
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
  paper: {
    margin: theme.spacing(0, 4),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: "fit-content",
  },
}));

const DanhSachGioHang = (props) => {
  // CSS class
  const classes = useStyles();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.ListNguoiDung);
  const cartList = useSelector((state) => state.ListGioHang);
  const { listChiTietGioHang } = useSelector(
    (state) => state.ListChiTietGioHang
  );

  const { userInfo } = useSelector((state) => state.User);
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedForCreate, setSelectedForCreate] = useState(null);
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
  useEffect(() => {
    if (selectedForCreate !== null) {
      const data = Object.values(listChiTietGioHang).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);
      if (data.length !== 0) {
        const cart = listGioHang[selectedForCreate];
        const PBH = {
          MaNguoiDung: userInfo.MaNguoiDung,
          MaKhachHang: cart.MaNguoiDung,
          TongTien: cart.TongTien,
          PhuongThucThanhToan: cart.PhuongThucThanhToan,
          ChiTietPhieuBanHang: data,
          NgayBan: moment(cart.NgayLap).format("YYYY-MM-DD") + "",
          GhiChu: null,
        };
        console.log(PBH);
        dispatch(createPhieuBanHang(PBH));
        setSelectedForCreate(null);
        setUpdateData(!updateData);
      }
    }
  }, [listChiTietGioHang]);

  const handleDetail = (item) => {
    setGroupBoxes([
      {
        type: "Label",
        title: "T??n Kh??ch H??ng",
        value: item.TenNguoiDung,
      },
      {
        type: "Label",
        title: "T???ng Ti???n",
        value: item.TongTien.toLocaleString("it-IT"),
      },
      {
        type: "Label",
        title: "Ng??y L???p",
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
      title: "B???n c?? mu???n x??a ????n h??ng kh??ng?",
      onConfirm: () => {
        deletePhieu(item);
      },
    });
  };

  const handleConfirm = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "B???n c?? mu???n x??c nh???n ????n h??ng kh??ng?",
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
    setSelectedForCreate(item.MaGioHang);
    dispatch(fetchListChiTietGioHang(item.MaGioHang));
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
            Qu???n l?? gi??? h??ng
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
                              : (item.TrangThai === "???? giao h??ng" &&
                                  "rgba(9,182,109,1)") ||
                                (item.TrangThai === "??ang x??? l??" && "#FFAF38"),
                            boxShadow: " 0 2px 2px 1px rgba(0,0,0,0.24)",
                          }}
                        >
                          {item.TrangThai}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TongTien.toString().replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        )}{" "}
                        VN??
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="X??c nh???n">
                          <IconButton
                            onClick={() => handleConfirm(item)}
                            disabled={
                              item.IsDeleted === true ||
                              item.TrangThai === "???? giao h??ng" ||
                              item.TrangThai === "???? h???y"
                            }
                          >
                            <Check
                              className={
                                item.IsDeleted === true ||
                                item.TrangThai === "???? giao h??ng" ||
                                item.TrangThai === "???? h???y"
                                  ? ""
                                  : classes.checkButton
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="H???y ????n">
                          <IconButton
                            onClick={() => handleDelete(item)}
                            disabled={
                              item.IsDeleted === true ||
                              item.TrangThai === "???? giao h??ng" ||
                              item.TrangThai === "???? h???y"
                            }
                          >
                            <Clear
                              className={
                                item.IsDeleted === true ||
                                item.TrangThai === "???? giao h??ng" ||
                                item.TrangThai === "???? h???y"
                                  ? ""
                                  : classes.cancelButton
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xem chi ti???t">
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
              title="Th??ng Tin Phi???u B??n H??ng"
              openPopup={openDetailPopup}
              setOpenPopup={setOpenDetailPopup}
            >
              <Detail
                type="cart"
                id={selectedItem}
                header="Gi??? h??ng"
                headCells={detailsHeadCells}
                groupBoxes={groupBoxes}
                Print={handlePrintClick}
              />
            </Popup>
            <Popup
              title="In Phi???u B??n H??ng"
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
