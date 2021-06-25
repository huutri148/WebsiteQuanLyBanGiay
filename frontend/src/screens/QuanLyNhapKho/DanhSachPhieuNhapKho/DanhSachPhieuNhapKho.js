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
  Delete,
} from "@material-ui/icons";
import Input from "../../../components/controls/Input";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../components/useTable";
import moment from 'moment'
import Popup from "../../../components/controls/Popup";
import Detail from "../../../components/controls/Detail";
import { fetchListPhieuNhapKho, deletePhieuNhapKho} from "../../../redux/actions/phieuNhapKhoAction";
import RecdocketToPrint from "../RecdocketToPrint";
//import recdocketToPrint from "../recdocketToPrint";
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
  { id: "SoPhieuNhapKho", label: "Số phiếu" },
  { id: "NgayNhapKho", label: "Ngày nhập kho" },
  { id: "TenNhaCungCap", label: "Tên Nhà Cung Cấp" },
  { id: "TongTien", label: "Tổng Tiền" },
  { id: "TenNguoiDung", label: "Người lập", disableSorting: true },
  { id: "actions", disableSorting: true  },
];
const detailsHeadCells = [
  { id: "TenGiay", label: "Tên Giày" },
  { id: "GioiTinh", label: "Giới Tính" },
  { id: "Size", label: "Size" },
  { id: "DonGiaNhap", label: "Đơn Giá Nhập" },
  { id: "SoLuong", label: "Số Lượng" },
  { id: "ThanhTien", label: "Thành Tiền" },
  { id: "HanhDong", disableSorting: true  },
];
const DanhSachPhieuNhapKho = (props) => {
  // CSS class
  const classes = useStyles();
  //Fetched data
  const dispatch = useDispatch();
  const recdocketList = useSelector((state) => state.ListPhieuNhapKho);
  //passing value
  const { loading: phieuNhapKhoLoading, error: phieuNhapKhoError, listPhieuNhapKho } = recdocketList;
  //data
  const [recdockets, setrecdockets] = useState([]);
  const [recdocket, setrecdocket] = useState({});
  //hooks
  const [id, setId] = useState(0);
  const [openPrintPopup, setOpenPrintPopup] = useState(false);
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [ignored, forceUpdate] = useState(false);
  // Props in Screens
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(recdockets, headCells, filterFn);
  const [groupBoxes, setGroupBoxes] = useState([]) ;
  //handle click
  const handleDetailClick = (item) => {
    setGroupBoxes ([
      {
        type: "Label",
        title: "Tên Nhà Cung Cấp",
        value: item.TenNhaCungCap,
      },
      {
        type: "Label",
        title: "Tổng Tiền",
        value: item.TongTien.toLocaleString("it-IT"),
      },
      {
        type: "Label",
        title: "Người Lập",
        value: item.TenNguoiDung,
      },
      {
        type: "Label",
        title: "Ngày Nhập Kho",
        value: moment(item.NgayNhapKho).format("DD/MM/YYYY"),
      },
      {
        type: "Label",
        title: "Ghi Chú",
        value: item.GhiChu,
      },
    ]);
    setId(item.SoPhieuNhapKho);
    setOpenDetailPopup(true);
  }
  const handleDeleteClick = (item) => {
    setOpenDeletePopup(true);
    setId(item.SoPhieuNhapKho);
  }
  const handleConfirmDeleteClick = () => {
    dispatch(deletePhieuNhapKho(id));
    let it = recdockets.findIndex(i => i.SoPhieuNhapKho === id);
    if(it >= 0)
      recdockets[it].IsDeleted = true;
    setOpenDeletePopup(false);
  }
  const handlePrintClick = (item) => {
    setGroupBoxes ([
      {
        type: "Label",
        title: "Tên Nhà Cung Cấp",
        value: item.TenNhaCungCap,
      },
      {
        type: "Label",
        title: "Tổng Tiền",
        value: item.TongTien.toLocaleString("it-IT"),
      },
      {
        type: "Label",
        title: "Người Lập",
        value: item.TenNguoiDung,
      },
      {
        type: "Label",
        title: "Ngày Nhập Kho",
        value: moment(item.NgayNhapKho).format("DD/MM/YYYY"),
      },
      {
        type: "Label",
        title: "Ghi Chú",
        value: item.GhiChu,
      },
    ]);
    setId(item.SoPhieuNhapKho);
    setOpenPrintPopup(true);
  }
  const handleEditClick = (item) => {
    if(item.IsPaid === 0)
      {
        props.setValue(2);
        props.setRecdocket(item);
      }
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
  // set recdockets
  useEffect(() => {
    if (listPhieuNhapKho != undefined) 
    {
      const recdocketsData = Object.values(listPhieuNhapKho).reduce((result, value) => {
        result.push({
          ...value,
          IsDeleted: false
        });
        return result;
      }, []);
      setrecdockets(recdocketsData);
    }
  }, [listPhieuNhapKho]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListPhieuNhapKho());
    };
    fetchData();
  }, [dispatch]);
    return (
    <>
      {recdockets === [] || recdockets === undefined ? (<h1>Loading</h1>) 
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
                    item.IsDeleted === false && <TableRow
                      key={item.SoPhieuNhapKho}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {item.SoPhieuNhapKho}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {moment(item.NgayNhapKho).format("DD/MM/YYYY")}
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
                      <Tooltip title="Sửa phiếu">
                          <IconButton onClick = {() => handleEditClick(item)} disabled = {item.IsPaid === 1 ? 'disabled' : ''}>
                            <Edit color={item.IsPaid === 0 ? "primary" : "disabled"}/>
                          </IconButton>
                        </Tooltip>
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
                        <Tooltip title="Xoá Phiếu">
                        <IconButton onClick = {() => handleDeleteClick(item)} disabled = {item.IsPaid === 1 ? 'disabled' : ''}>
                            <Delete  color={item.IsPaid === 0 ? "secondary" : "disabled"}/>
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
            title="Thông Tin Phiếu Nhập Kho"
            openPopup={openDetailPopup}
            setOpenPopup={setOpenDetailPopup}>
            <Detail 
              type = "recdocket" 
              id = {id}
              header = "Phiếu Nhập Kho"
              headCells = {detailsHeadCells}
              groupBoxes = {groupBoxes}/>
          </Popup>
          <Popup
            title="In Phiếu Nhập Kho"
            openPopup={openPrintPopup}
            setOpenPopup={setOpenPrintPopup}>
              <RecdocketToPrint 
                 id = {id}
                 groupBoxes = {groupBoxes}
              />
          </Popup>
          <Popup
            title="Xoá Phiếu Nhập Kho"
            openPopup={openDeletePopup}
            setOpenPopup={setOpenDeletePopup}>
              <div style = {{display: "block", fontSize: 24, textAlign: "center"}}>
              <p>Bạn Có Chắc Muốn Xoá Phiếu Nhập Kho Này ?</p>
              <Button size="large" variant="contained" color="primary" onClick = {() => handleConfirmDeleteClick()}>
                Xác Nhận
              </Button>
              </div>
          </Popup>
        </div>
      )}
    </>
  );
};

export default DanhSachPhieuNhapKho;
