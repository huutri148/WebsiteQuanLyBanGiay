import { CssBaseline, makeStyles, Tab, Tabs } from "@material-ui/core";
import { React, useState, useEffect } from "react";
import DanhSachSanPham from "./DanhSachSanPham/DanhSachSanPham";
import ThemSanPham from "./ThemSanPham";
import { useDispatch, useSelector } from "react-redux";
import { fetchListHangSanXuat } from "../../redux/actions/hangSanXuatAction";
import { fetchListSize } from "../../redux/actions/sizeAction";
import { fetchListMau } from "../../redux/actions/mauAction";
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
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const mauList = useSelector((state) => state.ListMau);
  const {
    loading: brandLoading,
    error: hangSanXuatError,
    listHangSanXuat,
  } = brandList;

  const { loading: sizeLoading, error: sizeError, listSize } = sizeList;
  const { loading: mauLoading, error: mauError, listMau } = mauList;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListHangSanXuat());
      await dispatch(fetchListMau());
      await dispatch(fetchListSize());
    };
    fetchData();
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  return (
    <>
      {sizeLoading || brandLoading || mauLoading ? (
        <h1> Loading </h1>
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

          <TabPanel value={value} index={0}>
            <DanhSachSanPham
              className={classes.tabPaper}
              ListSize={listSize}
              ListMau={listMau}
              ListHSX={listHangSanXuat}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ThemSanPham
              ListSize={listSize}
              ListMau={listMau}
              ListHSX={listHangSanXuat}
            />
          </TabPanel>
        </div>
      )}
    </>
  );
};

export default QuanLySanPham;
