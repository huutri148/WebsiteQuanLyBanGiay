import {
  CssBaseline,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Grid,
  Button,
  Table,
  IconButton,
} from "@material-ui/core";
import { React, useState } from "react";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import Selector from "../../components/controls/Selector/Selector";
import "./QuanLyBanHang.css";
import { AddCircle } from "@material-ui/icons";

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
  tabHeader: {
    textTransform: "none",
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
}));

const products = [
  {
    MaGiay: 1,
    TenGiay: "Van Old Skool Violet",
    TenHangSanXuat: "Nike",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/2.jpg",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 3,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 2,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 4,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    GioiTinh: "Unisex",
    Anh: "/images/1.png",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 5,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 6,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    DonGia: "2000000",
  },
  {
    MaGiay: 7,
    TenGiay: "Fila Wave Neo",
    TenHangSanXuat: "Fila",
    TenMau: "Violet",
    Anh: "/images/1.png",
    GioiTinh: "Unisex",
    SoLuong: 20,
    DonGia: "2000000",
  },
];

const QuanLyBanHang = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

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
          <Tab className={classes.tabHeader} label="Lập Phiếu Bán Hàng" />
          <Tab className={classes.tabHeader} label="Danh Sách Phiếu Bán Hàng" />
        </Tabs>
      </div>
      <label className={classes.titleHeader}>
        {value == 0 ? "Lập Phiếu Bán Hàng" : "Danh Sách Phiếu Bán Hàng"}
      </label>
      <TabPanel value={value} index={0}>
        <div>
          <Grid container spacing={0}>
            <Paper className={classes.paper} style={{ width: "20%" }}>
              <label
                className={classes.cardHeader}
                style={{ textAlign: "center" }}
              >
                Thông Tin Phiếu
              </label>
              <hr className={classes.hr} />
              <GroupBox type="TextBox" title="Tên Khách Hàng" required={true} />
              <GroupBox type="TextBox" title="Số Điện Thoại" required={true} />
              <GroupBox
                type="TextBox"
                title="Tổng Tiền"
                disabled="disabled"
                required={true}
              />
              <GroupBox
                type="TextBox"
                title="Người Lập"
                disabled="disabled"
                required={true}
              />
              <GroupBox type="Picker" title="Ngày Lập" required={true} />
              <GroupBox type="TextBox" title="Ghi Chú" required={false} />
              <Button size="large" variant="contained" color="primary">
                Lập Phiếu
              </Button>
              <hr className={classes.hr} />
              <label
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Lưu ý: Tiền được tính theo VNĐ
              </label>
            </Paper>
            <Paper
              className={classes.paper}
              style={{ width: "72%", margin: 0 }}
            >
              <label className={classes.cardHeader}>Chi Tiết Phiếu</label>
              <hr className={classes.hr} />
              <Selector title="Hàng Hoá" products={products} />
              <hr className={classes.hr} style={{ marginTop: 15 }} />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tên Giày</th>
                    <th>Giới Tính</th>
                    <th>Size</th>
                    <th>Đơn Giá</th>
                    <th>Số Lượng</th>
                    <th>Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="25%">
                      <input disabled="disabled" />
                    </td>
                    <td width="15%">
                      <input disabled="disabled" />
                    </td>
                    <td width="10%">
                      <input disabled="disabled" />
                    </td>
                    <td width="15%">
                      <input disabled="disabled" />
                    </td>
                    <td width="15%">
                      <input />
                    </td>
                    <td width="15%">
                      <input disabled="disabled" />
                    </td>
                    <td width="15%">
                      <IconButton
                        style={{ marginBottom: 15 }}
                        aria-label="Add"
                        size="small"
                      >
                        <AddCircle />
                      </IconButton>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <hr className={classes.hr} />
            </Paper>
          </Grid>
        </div>
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

export default QuanLyBanHang;
