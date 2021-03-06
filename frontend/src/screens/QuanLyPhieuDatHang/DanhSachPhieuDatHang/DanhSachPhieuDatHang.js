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
  ArrowRightAlt,
  CloudDownload,
  Print,
  FilterList,
  PrintDisabledRounded,
  ViewColumn,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import moment from "moment";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import {
  updatePhieuDatHang,
  deletePhieuDatHang,
} from "../../../redux/actions/phieuDatHangAction";
import { DSPDHHeadCell } from "../ThongTinPhieuDatHang";
import ConfirmDialog from "../../../components/controls/ConfirmDialog";
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

const DanhSachPhieuDatHang = (props) => {
  const { UpdateData } = props;

  // CSS class
  const classes = useStyles();
  const dispatch = useDispatch();

  const supplierList = useSelector((state) => state.ListNhaCungCap);
  const userList = useSelector((state) => state.ListNguoiDung);
  const orderList = useSelector((state) => state.ListPhieuDatHang);
  const { loading: supplierLoading, listNhaCungCap } = supplierList;
  const { loading: userLoading, listNguoiDung } = userList;
  const { loading: orderLoading, listPhieuDatHang } = orderList;

  // Props in Screens
  const [tableData, setTableData] = useState([]);
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

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(tableData, DSPDHHeadCell, filterFn);

  useEffect(() => {
    const combineData = () => {
      const data = Object.values(listPhieuDatHang).reduce((result, value) => {
        let maNguoiDung = value.MaNguoiDung;
        let maNhaCungCap = value.MaNhaCungCap;
        if (typeof listNguoiDung[maNguoiDung] === "undefined") return [];
        if (typeof listNhaCungCap[maNhaCungCap] === "undefined") return [];
        let { TenNhaCungCap } = listNhaCungCap[maNhaCungCap];
        let { TenNguoiDung } = listNguoiDung[maNguoiDung];
        const date = moment(value.NgayLap).format("DD/MM/YYYY");

        result.push({
          ...value,
          TenNhaCungCap,
          TenNguoiDung,
          NgayLap: date,
        });
        return result;
      }, []);
      setTableData(data);
    };
    combineData();
  }, [listNhaCungCap, listNguoiDung, listPhieuDatHang]);

  const handleDetail = (data) => {};
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.TenNhaCungCap.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const handleDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "B???n c?? mu???n x??a s???n ph???m kh??ng?",
      onConfirm: () => {
        deletePhieu(item);
      },
    });
  };

  const handleConfirm = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "B???n c?? mu???n x??c nh???n phi???u kh??ng?",
      onConfirm: () => {
        confirmPhieu(item);
      },
    });
  };
  const deletePhieu = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deletePhieuDatHang(item.SoPhieuDatHang));
    UpdateData();
  };
  const confirmPhieu = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const updateItem = {
      ...item,
      TrangThai: "???? x??? l??",
    };
    UpdateData();
    dispatch(updatePhieuDatHang(item.SoPhieuDatHang, updateItem));
  };
  return (
    <>
      {supplierLoading || userLoading || orderLoading ? (
        <Loading />
      ) : (
        <div>
          <Typography component="h1" variant="h5" className={classes.title}>
            Qu???n l?? phi???u ?????t h??ng
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
                  <CSVLink data={tableData} filename={"DS-PhieuDatHang.csv"}>
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
                <Tooltip title="Ch???n c???t">
                  <IconButton className={classes.actionsButton}>
                    <ViewColumn />
                  </IconButton>
                </Tooltip>
                <Tooltip title="L???c">
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
                        {item.SoPhieuDatHang}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNhaCungCap}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNguoiDung}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography
                          className={classes.status}
                          style={{
                            backgroundColor:
                              //Note: Fix hardcode 100
                              (item.TrangThai === "???? x??? l??" &&
                                "rgba(9,182,109,1)") ||
                              (item.TrangThai === "Ch???" && "#FF3D57"),
                            boxShadow: " 0 2px 2px 1px rgba(0,0,0,0.24)",
                          }}
                        >
                          {item.TrangThai}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.NgayLap}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="X??c nh???n">
                          <IconButton
                            onClick={() => handleConfirm(item)}
                            disabled={
                              item.IsDeleted === true ||
                              item.TrangThai === "???? x??? l??"
                            }
                          >
                            <Check
                              className={
                                item.IsDeleted === true ||
                                item.TrangThai === "???? x??? l??"
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
                              item.TrangThai === "???? x??? l??"
                            }
                          >
                            <Clear
                              className={
                                item.IsDeleted === true ||
                                item.TrangThai === "???? x??? l??"
                                  ? ""
                                  : classes.cancelButton
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xem chi ti???t">
                          <IconButton onClick={() => handleDetail(item)}>
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
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
          </Paper>
        </div>
      )}
    </>
  );
};

export default DanhSachPhieuDatHang;
