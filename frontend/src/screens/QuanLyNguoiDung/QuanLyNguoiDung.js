import { CssBaseline, makeStyles, Tab, Tabs } from "@material-ui/core";
import { React, useState } from "react";
import DanhSachKhachHang from "./DanhSachKhachHang/DanhSachKhachHang";
import DanhSachNhanVien from "./DanhSachNhanVien/DanhSachNhanVien";
import { QuanLyNguoiDungTab } from "./ThongTinQuanLyNguoiDung";

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
  tabPaper: {
    display: "inline-block",
    float: "left",
  },
  tabHeader: {
    textTransform: "none",
  },
}));

const QuanLyPhieuDatHang = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab className={classes.tabHeader} label="Khách hàng" />
          <Tab className={classes.tabHeader} label="Nhân viên" />
        </Tabs>
      </div>

      <TabPanel value={value} index={QuanLyNguoiDungTab.DanhSachKhachHang}>
        <DanhSachKhachHang className={classes.tabPaper} />
      </TabPanel>
      <TabPanel value={value} index={QuanLyNguoiDungTab.DanhSachNhanVien}>
        <DanhSachNhanVien />
      </TabPanel>
    </div>
  );
};

export default QuanLyPhieuDatHang;
