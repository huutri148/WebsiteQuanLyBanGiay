import {
    CssBaseline,
    makeStyles,
    Tab,
    Tabs,
  } from "@material-ui/core";
  import { React, useState, useEffect } from "react";
  import "../QuanLyBanHang/QuanLyBanHang.css";
  import PhieuNhapKho from "./PhieuNhapKho"
  import { useDispatch, useSelector } from "react-redux";
  import { fetchListGiay } from "../../redux/actions/giayAction";
  import { fetchListHangSanXuat } from "../../redux/actions/hangSanXuatAction";
  import { fetchListSize } from "../../redux/actions/sizeAction";
  import { fetchListMau } from "../../redux/actions/mauAction";
  import { fetchListNhaCungCap } from "../../redux/actions/nhaCungCapAction";
  import DanhSachPhieuNhapKho from "./DanhSachPhieuNhapKho/DanhSachPhieuNhapKho";
  
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
    const supplierList = useSelector((state) => state.ListNhaCungCap);
    //passing value
    const { loading: hangSanXuatLoading, error: hangSanXuatError, listHangSanXuat } = brandList;
    const { loading: giayLoading, error: giayError, listGiay } = productList;
    const { loading: sizeLoading, error: sizeError, listSize } = sizeList;
    const { loading: mauLoading, error: mauError, listMau } = colorList;
    const { loading: nhacungcapLoading, error: nhacungcapError, listNhaCungCap } = supplierList;
    //data
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    //variables
    const [value,setValue] = useState(0);
    //handle change
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
    // set Sizes
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
    // set Suppliers
    useEffect(() => {
      if (listNhaCungCap != undefined) {
        const suppliersData = Object.values(listNhaCungCap).reduce((result, value) => {
          result.push({
            ...value,
          });
          return result;
        }, []);
        setSuppliers(suppliersData);
      }
    }, [listNhaCungCap]);
    useEffect(() => {
      const fetchData = async () => {
        await dispatch(fetchListNhaCungCap());
      };
      fetchData();
    }, []);
    // set Products
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
    }, [listGiay,listHangSanXuat,listMau]);
    //fetch data
    useEffect(() => {
      const fetchData = async () => {
        await dispatch(fetchListGiay());
        await dispatch(fetchListMau());
        await dispatch(fetchListHangSanXuat());
        await dispatch(fetchListSize());
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
            <Tab className={classes.tabHeader} label="Danh Sách Phiếu Nhập Kho" />
            <Tab className={classes.tabHeader} label="Lập Phiếu Nhập Kho" />
          </Tabs>
        </div>
        <label className={classes.titleHeader}>
          {value === 1 ? "Lập Phiếu Nhập Kho" : "Danh Sách Phiếu Nhập Kho"}
        </label>
        <TabPanel value={value} index={0}>
          <DanhSachPhieuNhapKho />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PhieuNhapKho 
            key={"PhieuNhapKho"}
            index={0}
            suppliers = {suppliers}
            sizes = {sizes}
            products = {products}
            isLoading = {!nhacungcapLoading && !sizeLoading && !giayLoading ? false : true}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
        </TabPanel>
      </div>
    );
  };
  
  export default QuanLyBanHang;
  