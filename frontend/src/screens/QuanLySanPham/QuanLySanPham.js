import { CssBaseline, makeStyles, Tab, Tabs } from "@material-ui/core";
import { React, useState, useEffect } from "react";
import DanhSachSanPham from "./DanhSachSanPham/DanhSachSanPham";
import ThemSanPham from "./SanPhamForm/ThemSanPham";
import { useDispatch, useSelector } from "react-redux";
import { fetchListHangSanXuat } from "../../redux/actions/hangSanXuatAction";
import { fetchListSize } from "../../redux/actions/sizeAction";
import { fetchListMau } from "../../redux/actions/mauAction";
import { QuanLySanPhamTab } from "./ThongTinQuanLySanPham";
import Loading from "../../components/Loadable/Loading";

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

const QuanLySanPham = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(QuanLySanPhamTab.DanhSachSanPham);
  const [updateFromChildren, setUpdateFromChildren] = useState(false);

  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const mauList = useSelector((state) => state.ListMau);
  const { loading: brandLoading, error: hangSanXuatError } = brandList;

  const { loading: sizeLoading, error: sizeError } = sizeList;
  const { loading: mauLoading, error: mauError } = mauList;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListHangSanXuat());
      await dispatch(fetchListMau());
      await dispatch(fetchListSize());
    };

    fetchData();
  }, [dispatch, updateFromChildren]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const switchTab = (value) => {
    setValue(value);
  };

  const updateData = () => {
    setUpdateFromChildren(!updateFromChildren);
  };
  return (
    <>
      {sizeLoading || brandLoading || mauLoading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <CssBaseline />
          <div>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={value}
              onChange={handleChange}
            >
              <Tab className={classes.tabHeader} label="Quản lý sản phẩm" />
              <Tab className={classes.tabHeader} label="Thêm sản phẩm" />
            </Tabs>
          </div>

          <TabPanel value={value} index={QuanLySanPhamTab.DanhSachSanPham}>
            <DanhSachSanPham className={classes.tabPaper} />
          </TabPanel>
          <TabPanel value={value} index={QuanLySanPhamTab.SanPhamForm}>
            <ThemSanPham SwitchTab={switchTab} UpdateData={updateData} />
          </TabPanel>
        </div>
      )}
    </>
  );
};

export default QuanLySanPham;
