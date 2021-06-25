import {
  makeStyles,
  Paper,
  Grid,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  IconButton,
} from "@material-ui/core";
import { React, useState, useEffect } from "react";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
import ProductSelector from "../../components/controls/Selector/ProductSelector";
import { AddCircle, Edit, HighlightOff } from "@material-ui/icons";
import useTable from "../../components/useTable";
import ProductCard from "../QuanLySanPham/ProductCard";
import InfoField from "../../components/controls/InfoField";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { createPhieuNhapKho, updatePhieuNhapKho, fetchListChiTietPhieuNhapKho } from "../../redux/actions/phieuNhapKhoAction";
import SizeSelector from "../../components/controls/Selector/SizeSelector";

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
const headCells = [
  { id: "TenGiay", label: "Tên Giày" },
  { id: "GioiTinh", label: "Giới Tính" },
  { id: "Size", label: "Size" },
  { id: "DonGiaNhap", label: "Giá Nhập" },
  { id: "SoLuong", label: "Số Lượng" },
  { id: "ThanhTien", label: "Thành Tiền" },
  { id: "HanhDong", disableSorting: true },
];
const PhieuNhapKho = (props) => {
  //styles
  const classes = useStyles();
  //fetch
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.ListChiTietPhieuNhapKho);
  const { loading: chitietphieunhapkhoLoading, error: chitietphieunhapkhoError, listChiTietPhieuNhapKho: listDetails } = detailList;
  //props
  const { products, sizes, suppliers, isLoading, setValue, recdocket } = props;
  //variables
  const [ignored, forceUpdate] = useState(false);
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [sumTotal, setSumTotal] = useState(recdocket === null ? 0 : Number(recdocket.TongTien));
  const [size, setSize] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  //regex
  const phoneRegex = /^[0-9\b]+$/;
  //table
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(selectedProducts, headCells, filterFn);
  const setSelectedProduct = (val) => {
    let tmp = products.find((obj) => obj.MaGiay === val);
    setProduct({ ...tmp });
    setEditing(false);
  };
  //handle Button click
  const handleAddClick = () => {
    if (amount === 0 || price == 0) {
      if (price === 0)
        setPriceError(true);
      if (amount === 0)
        setAmountError(true);
      return;
    }
    if (price === 0) {
      setPriceError(true);
      return;
    }
    if (!editing) {
      if (selectedProducts.find(element => element.MaChiTietGiay === product.MaChiTietGiay))
        return;
      let tmp = sumTotal + total;
      setSumTotal(tmp);
      groupBoxes[1].value = tmp.toLocaleString("it-IT");
      let shoe = { ...product, total, amount, size, price };
      selectedProducts.push(shoe);
      resetField();
    }
    else {
      let tmp = sumTotal + total - product.total;
      setSumTotal(tmp);
      groupBoxes[1].value = tmp.toLocaleString("it-IT");
      product.total = total;
      product.amount = amount;
      product.price = price;
      product.size = size;
      resetField();
    }
    forceUpdate(!ignored);
  };
  const handleRemoveClick = (item) => {
    selectedProducts.splice(selectedProducts.indexOf(item), 1);
    let tmp = sumTotal - item.total;
    setSumTotal(tmp);
    groupBoxes[1].value = tmp.toLocaleString("it-IT");
  };
  const handleEditClick = (item) => {
    setProduct(item);
    forceUpdate(!ignored);
    setEditing(true);
    setAmount(item.amount);
    setTotal(item.total);
    setPrice(item.price);
  };
  //handle submit
  const handleSubmitClick = () => {
    var isAbleToSubmit = false;
    groupBoxes.forEach((element) => {
      element.error = element.checkValidation(element.value);
      if (element.error === true)
        isAbleToSubmit = true;
    });
    if (isAbleToSubmit === true)
      forceUpdate(!ignored);
    else {
      let record = {};
      if (recdocket == null) {
        //set default date
        if (groupBoxes[3].value === undefined) {
          let date = new Date().getDate();
          if (date < 10) date = '0' + date;
          let month = new Date().getMonth() + 1;
          if (month < 10) month = '0' + month;
          groupBoxes[3].value = new Date().getFullYear() + "-" + month + "-" + date;
        }
        //get record
        record = {
          MaNhaCungCap: groupBoxes[0].value === undefined ? groupBoxes[0].options[0].value : groupBoxes[0].value.value,
          MaNguoiDung: 2,
          TongTien: sumTotal,
          NgayNhapKho: groupBoxes[3].value,
          GhiChu: groupBoxes[4].value === undefined ? null : groupBoxes[4].value,
          ChiTietPhieuNhapKho: selectedProducts.map(element => {
            return {
              MaChiTietGiay: element.MaChiTietGiay,
              SoLuongNhap: element.amount,
              GiaNhap: element.price,
              ThanhTien: element.total
            };
          })
        };
      }
      else {
        //new date
        let dData = groupBoxes[3].value.split('/');
        //get record
        record = {
          SoPhieuNhapKho: recdocket.SoPhieuNhapKho,
          MaNhaCungCap: groupBoxes[0].value === undefined ? recdocket.MaNhaCungCap : groupBoxes[0].value.value,
          MaNguoiDung: 2,
          TongTien: sumTotal,
          NgayNhapKho: dData[2]+"-"+dData[1]+"-"+dData[0],
          GhiChu: groupBoxes[4].value === undefined ? recdocket.GhiChu : groupBoxes[4].value,
          ChiTietPhieuNhapKho: selectedProducts.map(element => {
            return {
              MaChiTietGiay: element.MaChiTietGiay,
              SoLuongNhap: element.amount,
              GiaNhap: element.price,
              ThanhTien: element.total
            };
          })
        };
      }
      console.log(record);
      //to do: Add success later
      record.SoPhieuNhapKho === undefined ? dispatch(createPhieuNhapKho(record)) : dispatch(updatePhieuNhapKho(record.SoPhieuNhapKho, record));
      setValue(0);
    }
  };
  //handle Change
  const onAmountChange = (e) => {
    if (product != null) {
      let tmp = e.target.value;
      if (tmp === "") {
        setAmount(0);
        setTotal(0);
      }
      else
        if (tmp === 0 || phoneRegex.test(tmp)) {
          setAmount(Number(tmp));
          setTotal(Number(tmp) * price);
          if (Number(tmp) > 0)
            setAmountError(false);
          else
            setAmountError(true);
        }
    }
  };
  const onPriceChange = (e) => {
    if (product != null) {
      let val = e.target.value.split(".");
      let tmp = "";
      val.forEach(element => {
        tmp += element;
      });
      if (tmp === "") {
        setPrice(0);
        setTotal(0);
      }
      else if (tmp === 0 || phoneRegex.test(tmp)) {
        console.log("[IN]");
        setPrice(Number(tmp));
        setTotal(Number(tmp) * amount);
        Number(tmp) > 0 ? setPriceError(false) : setPriceError(true);
      }
    }
  };
  const onSizeChange = (e, size, MaChiTietGiay) => {
    setSize(size);
    setAmount(0);
    setTotal(0);
    setPrice(0);
    setPriceError(false);
    setAmountError(false);
    product.MaChiTietGiay = MaChiTietGiay;
  };
  const resetField = () => {
    setProduct(null);
    setAmount(0);
    setTotal(0);
    setSize(0);
    setPrice(0);
    setPriceError(false);
    setAmountError(false);
    setEditing(false);
  }
  const [groupBoxes, setGroupBoxes] = useState([
    {
      type: "Select",
      title: "Nhà Cung Cấp",
      required: true,
      defaultValue: recdocket !== null ? { value: recdocket.MaNhaCungCap, label: recdocket.TenNhaCungCap } : undefined,
      onChange: (e) => { groupBoxes[0].value = e; groupBoxes[0].error = false; },
      options: suppliers.map(element => { return { value: element.MaNhaCungCap, label: element.TenNhaCungCap } }),
      validationTip: "Nhà Cung Cấp không được trống",
      error: false,
      checkValidation: (val) => false,
    },
    {
      type: "TextBox",
      title: "Tổng Tiền",
      required: true,
      disabled: "disabled",
      value: recdocket !== null ? recdocket.TongTien : undefined,
      validationTip: "Tổng Tiền không được bằng 0",
      error: false,
      checkValidation: (val) => {
        if (val === 0) return true;
        return false;
      },
    },
    {
      type: "TextBox",
      title: "Người Lập",
      defaultValue: recdocket !== null ? recdocket.TenNguoiDung : undefined,
      required: true,
      disabled: "disabled",
      checkValidation: (val) => false,
    },
    {
      type: recdocket !== null ? "Label" :"Picker",
      title: "Ngày Lập",
      value: recdocket !== null ? moment(recdocket.NgayNhapKho).format("DD/MM/YYYY") : undefined,
      defaultValue: recdocket !== null ? moment(recdocket.NgayNhapKho).format("DD/MM/YYYY") : undefined,
      onChange: (e) => (groupBoxes[3].value = e.target.value),
      required: true,
      checkValidation: (val) => false,
    },
    {
      type: "TextBox",
      title: "Ghi Chú",
      defaultValue: recdocket !== null ? recdocket.GhiChu : undefined,
      onChange: (e) => (groupBoxes[4].value = e.target.value),
      required: false,
      checkValidation: (val) => false,
    },
  ]);
  useEffect(() => {
    if (listDetails != undefined) {
      const detailsData = Object.values(listDetails).reduce((result, value) => {
        result.push({
          Anh: value.Anh,
          MaChiTietGiay: value.MaChiTietGiay,
          TenGiay: value.TenGiay,
          GioiTinh: value.GioiTinh,
          size: value.MaSize - 1,
          price: value.GiaNhap,
          amount: value.SoLuongNhap,
          total: value.ThanhTien
        });
        setSelectedProducts(result);
        return result;
      }, []);
    }
  }, [listDetails]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      if(recdocket != null)
        await dispatch(fetchListChiTietPhieuNhapKho(recdocket.SoPhieuNhapKho));
    };
    fetchData();
  }, [dispatch]);
  return (
    <div>
      {groupBoxes === [] || suppliers === [] || products === [] || sizes === [] ?
        (<h1>Loading</h1>)
        :
        (
          <Grid container spacing={0}>
            {/* bill */}
            <Paper className={classes.paper} style={{ width: "20%" }}>
              <InfoField
                GroupBoxes={groupBoxes}
                cardHeader="Thông Tin Phiếu"
                buttonContent="Lưu Phiếu"
                disabled={selectedProducts.length === 0 ? "disabled" : ""}
                onClick={handleSubmitClick}
              />
            </Paper>
            {/* bill details */}
            <Paper className={classes.paper} style={{ width: "72%", margin: 0 }}>
              <label className={classes.cardHeader}>Chi Thiết Phiếu</label>
              <hr className={classes.hr} />
              <ProductSelector
                title="Hàng Hoá"
                products={products}
                setSelectedId={setSelectedProduct}
              />
              <hr className={classes.hr} style={{ marginTop: 15 }} />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="30%">
                      <GroupBox
                        key={0}
                        value={product === null ? "" : product.TenGiay}
                        type="TextBox"
                        title={headCells[0].label}
                        readOnly={true}
                      />
                    </td>
                    <td width="12%">
                      <GroupBox
                        key={1}
                        value={product === null ? "" : product.GioiTinh}
                        type="TextBox"
                        title={headCells[1].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="12%">
                      {product === null ? (
                        <GroupBox
                          key={2}
                          type="TextBox"
                          title={headCells[2].label}
                          disabled="disabled"
                        />
                      ) : editing ? (
                        <GroupBox
                          key={2}
                          type="TextBox"
                          title={headCells[2].label}
                          disabled="disabled"
                          value={sizes[product.size].TenSize}
                        />
                      ) : (
                        <SizeSelector
                          key={2}
                          title="Size"
                          ListSize={sizes}
                          selectedSize={size}
                          onSizeChange={onSizeChange}
                          item={product}
                        />
                      )}
                    </td>
                    <td width="15%">
                      <GroupBox
                        key={3}
                        value={price.toLocaleString("it-IT")}
                        type="Number"
                        title={headCells[3].label}
                        onChange={onPriceChange}
                        error={priceError}
                        validationTip={
                          "Giá Nhập phải lớn hơn 0"
                        }
                        disabled={product === null ? "disabled" : ""}
                      />
                    </td>
                    <td width="15%">
                      <GroupBox
                        key={4}
                        value={amount}
                        type="Number"
                        title={headCells[4].label}
                        onChange={onAmountChange}
                        error={amountError}
                        validationTip={
                          "Số Lượng phải lớn hơn 0"
                        }
                        disabled={product === null ? "disabled" : ""}
                      />
                    </td>
                    <td width="15%">
                      <GroupBox
                        key={5}
                        value={
                          product === null ? "" : total.toLocaleString("it-IT")
                        }
                        type="TextBox"
                        title={headCells[5].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="10%">
                      <IconButton
                        key={6}
                        style={{ marginBottom: -10 }}
                        aria-label="Add"
                        color="primary"
                        size="small"
                        disabled={product === null ? "disabled" : ""}
                        onClick={handleAddClick}
                      >
                        <AddCircle />
                      </IconButton>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <hr className={classes.hr} />
              <TableContainer
                style={{
                  display: selectedProducts.length === 0 ? "none" : "table",
                }}
                className={classes.table}
              >
                <TblContainer>
                  <TblHead />
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
                          {sizes[item.size].TenSize}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.price.toLocaleString("it-IT")}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.amount}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {item.total.toLocaleString("it-IT")}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          <IconButton size="small" color="primary">
                            <Edit onClick={() => handleEditClick(item)} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleRemoveClick(item)}
                          >
                            <HighlightOff />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination />
              </TableContainer>
            </Paper>
          </Grid>
        )}
    </div>
  );
};

export default PhieuNhapKho;
