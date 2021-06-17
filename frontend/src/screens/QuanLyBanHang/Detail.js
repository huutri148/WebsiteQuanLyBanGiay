import { React, useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Table,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import useTable from "../../components/useTable";
import ProductCard from "../QuanLySanPham/ProductCard";
import { fetchListChiTietPhieuBanHang } from "../../redux/actions/phieuBanHangAction";
import { fetchListChiTietGioHang } from "../../redux/actions/gioHangAction";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: "fit-content",
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "darkslateblue",
  },
  hr: {
    border: 0,
    borderTop: "1px solid #eee",
    width: "100%",
  },
  titleHeader: {
    textTransform: "none",
    fontSize: 32,
    color: "darkslateblue",
    fontWeight: "Bold",
  },
  td: {
    padding: "0px 10px",
  },
  table: {
    padding: theme.spacing(0, 1),
  },
}));

const Detail = (props) => {
  // CSS class
  const classes = useStyles();
  //props
  const { type, id, header, groupBoxes, headCells } = props;
  //hooks
  const [details, setDetails] = useState([]);
  //data TODO: add optional later
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.ListChiTietPhieuBanHang);
  const cartDetailList = useSelector((state) => state.ListChiTietGioHang);
  const {
    loading: chitietphieubanhangLoading,
    error: chitietphieubanhangError,
    listChiTietPhieuBanHang: listDetails,
  } = detailList;
  const {
    loading: gioHangLoading,
    error: gioHangError,
    listChiTietGioHang,
  } = cartDetailList;
  //table
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(details, headCells, filterFn);
  //fetch data
  useEffect(() => {
    if (type === "bill") {
      if (listDetails != undefined) {
        const detailsData = Object.values(listDetails).reduce(
          (result, value) => {
            result.push({
              ...value,
            });
            return result;
          },
          []
        );
        setDetails(detailsData);
      }
    }
    if (type === "cart") {
      if (listChiTietGioHang != undefined) {
        const detailsData = Object.values(listChiTietGioHang).reduce(
          (result, value) => {
            result.push({
              ...value,
            });
            return result;
          },
          []
        );
        setDetails(detailsData);
      }
    }
  }, [listDetails, listChiTietGioHang]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (type === "cart") await dispatch(fetchListChiTietGioHang(id));
      if (type === "bill") await dispatch(fetchListChiTietPhieuBanHang(id));
    };
    fetchData();
  }, [dispatch]);
  return (
    <Grid container spacing={0}>
      {console.log(details)}
      <Paper className={classes.paper} style={{ width: "20%" }}>
        <label className={classes.cardHeader}>{header}</label>
        <hr className={classes.hr} />
        {groupBoxes.map((item, index) => (
          <GroupBox
            key={index}
            type={item.type}
            title={item.title}
            value={item.value}
          />
        ))}
      </Paper>
      <Paper className={classes.paper} style={{ width: "72%", margin: 0 }}>
        <label className={classes.cardHeader}>Chi Tiết Phiếu</label>
        <hr className={classes.hr} />
        <TableContainer className={classes.table}>
          <TblContainer>
            <TblHead />
            {(type === "bill" || type === "cart") && (
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow
                    key={item.MaChiTietGiay}
                    style={
                      index % 2
                        ? { background: "#eee" }
                        : { background: "white" }
                    }
                  >
                    <TableCell component="td" width="40%" scope="row">
                      <ProductCard
                        imgUrl={item.Anh}
                        PrimaryText={item.TenGiay}
                      />
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {item.GioiTinh}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {item.TenSize}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {item.GiaBan.toLocaleString("it-IT")}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {item.SoLuongMua}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {item.ThanhTien.toLocaleString("it-IT")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </TblContainer>
          <TblPagination />
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default Detail;
