import {
  CssBaseline,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import { React, useState, useEffect } from "react";
import "./QuanLyBanHang.css";
import PhieuBanHang from "./PhieuBanHang"
import { useDispatch, useSelector } from "react-redux";
import { fetchListGiay } from "../../redux/actions/giayAction";
import { fetchListHangSanXuat } from "../../redux/actions/hangSanXuatAction";
import { fetchListSize } from "../../redux/actions/sizeAction";
import { fetchListMau } from "../../redux/actions/mauAction";
import { fetchListNguoiDung } from "../../redux/actions/nguoiDungAction";
import { fetchGiaySize } from "../../redux/actions/giayAction";

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
  tabHeader: {
    textTransform: "none",
  },
  titleHeader: {
    textTransform: "none",
    fontSize: 32,
    color: "darkslateblue",
    fontWeight: "Bold",
  },
}));
const QuanLyBanHang = () => {
  //styles
  const classes = useStyles();
  //Fetched data
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.ListGiay);
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const colorList = useSelector((state) => state.ListMau);
  const userList = useSelector((state) => state.ListNguoiDung);
  const { error: hangSanXuatError, listHangSanXuat } = brandList;
  const { error: giayError, listGiay } = productList;
  const { error: sizeError, listSize } = sizeList;
  const { error: mauError, listMau } = colorList;
  const { error: nguoidungError, listNguoiDung } = userList;
  //data
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [users, setUsers] = useState([]);
  //variables
  const [loading, setLoading] = useState();
  const [value,setValue] = useState();
  //handle Change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  // set and map Products, Sizes, Users when done fetching
  useEffect(() => {
    if (listGiay != undefined) {
      const productsData = Object.values(listGiay).reduce((result, value) => {
        let maHSX = value.MaHangSanXuat;
        if (typeof listHangSanXuat[maHSX] === "undefined") return [];
        let { TenHangSanXuat } = listHangSanXuat[maHSX];
        let maMau = value.MaMau;
        if (typeof listMau[maMau] === "undefined") return [];
        let { TenMau } = listMau[maMau];
        result.push({
          TenHangSanXuat,
          TenMau,
          ...value,
        });
        return result;
      }, []);
      let tempData = productsData.map((item) => {
        item.DonGia = item.DonGiaNhap * (100 + item.TyLeLoiNhuan * 100) / 100;
        return item;
      });
      setProducts(tempData);
    }
    if (listSize != undefined) {
      const sizesData = Object.values(listSize).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);
      setSizes(sizesData);
    }

    if (listNguoiDung != undefined) {
      const usersData = Object.values(listNguoiDung).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);
      setUsers(usersData);
    }
  }, [loading]);
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListGiay());
      await dispatch(fetchListHangSanXuat());
      await dispatch(fetchListSize());
      await dispatch(fetchListMau());
      await dispatch(fetchListNguoiDung());
      //set Flag to combine TableData
      // Note: Find a way to select lastest data
      // Done have to use Flag
      setLoading(!loading);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleTabChange}
        >
          <Tab className={classes.tabHeader} label="Lập Phiếu Bán Hàng" />
          <Tab className={classes.tabHeader} label="Danh Sách Phiếu Bán Hàng" />
        </Tabs>
      </div>
      <label className={classes.titleHeader}>
        {value === 0 ? "Lập Phiếu Bán Hàng" : "Danh Sách Phiếu Bán Hàng"}
      </label>
      <TabPanel value={value} index={0}>
        <PhieuBanHang 
          users = {users}
          sizes = {sizes}
          products = {products}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
    </div>
  );
};

export default QuanLyBanHang;
