import {
  CssBaseline,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import { React, useState, useEffect } from "react";
import "./QuanLyBanHang/QuanLyBanHang.css";
import PhieuBanHang from "./QuanLyBanHang/PhieuBanHang"
import { useDispatch, useSelector } from "react-redux";
import { fetchListGiay } from "../redux/actions/giayAction";
import { fetchListHangSanXuat } from "../redux/actions/hangSanXuatAction";
import { fetchListSize } from "../redux/actions/sizeAction";
import { fetchListMau } from "../redux/actions/mauAction";
import { fetchListPhieuBanHang} from "../redux/actions/phieuBanHangAction";
import { fetchListNguoiDung } from "../redux/actions/nguoiDungAction";
import { FaceRounded } from "@material-ui/icons";

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
  const billList = useSelector((state) => state.ListPhieuBanHang);
  //passing value
  const { loading: hangSanXuatLoading, error: hangSanXuatError, listHangSanXuat } = brandList;
  const { loading: giayLoading, error: giayError, listGiay } = productList;
  const { loading: sizeLoading, error: sizeError, listSize } = sizeList;
  const { loading: mauLoading, error: mauError, listMau } = colorList;
  const { loading: nguoidungLoading, error: nguoidungError, listNguoiDung } = userList;
  const { loading: phieubanhangLoading, error: phieubanhangError, listPhieuBanHang } = billList;
  //data
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [users, setUsers] = useState([]);
  const [bills, setBills] = useState([]);
  //variables
  const [loading, setLoading] = useState();
  const [value,setValue] = useState(0);
  //handle change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  // fetch and set Sizes
  useEffect(() => {
    if (listSize != undefined) {
      const sizesData = Object.values(listSize).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);
      setSizes(sizesData);
    }
  }, [listSize]);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListSize());
    };
    fetchData();
  }, []);
  // fetch and set Users
  useEffect(() => {
    if (listNguoiDung != undefined) {
      const usersData = Object.values(listNguoiDung).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);
      setUsers(usersData);
    }
  }, [listNguoiDung]);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListNguoiDung());
    };
    fetchData();
  }, []);
  // fetch and set Products
  useEffect(() => {
    if (listGiay != undefined) {
      const productsData = Object.values(listGiay).reduce((result, value) => {
        //hsx
        let maHSX = value.MaHangSanXuat;
        if (typeof listHangSanXuat[maHSX] === "undefined") return [];
        let { TenHangSanXuat } = listHangSanXuat[maHSX];
        //color
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
    
    if (listPhieuBanHang != undefined) {
      const billsData = Object.values(listPhieuBanHang).reduce((result, value) => {
        let maNguoiDung = value.MaNguoiDung;
        if (typeof listNguoiDung[maNguoiDung] === "undefined") return [];
        let { TenNguoiLap } = listNguoiDung[maNguoiDung];
        result.push({
          ...value,
          TenNguoiLap,
        });
        return result;
      }, []);
      setBills(billsData);
    }
  }, [listGiay,listHangSanXuat,listMau]);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListGiay());
      await dispatch(fetchListMau());
      await dispatch(fetchListHangSanXuat());
    };
    fetchData();
  }, []);
  // fetch and set Bills
  useEffect(() => {
    if (listPhieuBanHang != undefined) {
      const billsData = Object.values(listPhieuBanHang).reduce((result, value) => {
        let maNguoiDung = value.MaNguoiDung;
        if (typeof listNguoiDung[maNguoiDung] === "undefined") return [];
        let { TenNguoiLap } = listNguoiDung[maNguoiDung];
        result.push({
          ...value,
          TenNguoiLap,
        });
        return result;
      }, []);
      setBills(billsData);
    }
  }, [listNguoiDung,listPhieuBanHang]);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListPhieuBanHang());
    };
    fetchData();
  }, []);
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
          key={"PhieuBanHang"}
          index={0}
          users = {users}
          sizes = {sizes}
          products = {products}
          isLoading = {!nguoidungLoading && !nguoidungLoading && !giayLoading ? false : true}
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
