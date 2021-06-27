import { CssBaseline, makeStyles, Tab, Tabs } from "@material-ui/core";
import { React, useState, useEffect } from "react";
import DanhSachPhieuDatHang from "./DanhSachPhieuDatHang/DanhSachPhieuDatHang";
import PhieuDatHangForm from "./PhieuDatHangForm/PhieuDatHangForm";
import { useDispatch } from "react-redux";
import { fetchListNhaCungCap } from "../../redux/actions/nhaCungCapAction";
import { fetchListNguoiDung } from "../../redux/actions/nguoiDungAction";
import { fetchListPhieuDatHang } from "../../redux/actions/phieuDatHangAction";
import { QuanLyPhieuDatHangTab } from "./ThongTinPhieuDatHang";

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
  const [updateFromChildren, setUpdateFromChildren] = useState(false);
  const dispatch = useDispatch();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListNhaCungCap());
      await dispatch(fetchListNguoiDung());
      await dispatch(fetchListPhieuDatHang());
    };
    fetchData();
  }, [dispatch, updateFromChildren]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const updateTab = (id) => {
    setValue(id);
    setUpdateFromChildren(!updateFromChildren);
  };
  const updateState = () => {
    setUpdateFromChildren(!updateFromChildren);
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
          <Tab className={classes.tabHeader} label="Quản lý phiếu đặt hàng" />
          <Tab className={classes.tabHeader} label="Thêm phiếu đặt hàng" />
        </Tabs>
      </div>

      <TabPanel
        value={value}
        index={QuanLyPhieuDatHangTab.DanhSachPhieuDatHang}
      >
        <DanhSachPhieuDatHang
          className={classes.tabPaper}
          UpdateData={updateState}
        />
      </TabPanel>
      <TabPanel value={value} index={QuanLyPhieuDatHangTab.PhieuDatHangForm}>
        <PhieuDatHangForm SetTab={updateTab} />
      </TabPanel>
    </div>
  );
};

export default QuanLyPhieuDatHang;
