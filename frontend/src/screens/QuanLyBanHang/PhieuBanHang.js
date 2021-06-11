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
import "./QuanLyBanHang.css";
import {
  AddCircle,
  Edit,
  HighlightOff,
} from "@material-ui/icons";
import useTable from "../../components/useTable";
import ProductCard from "../QuanLySanPham/ProductCard";
import InfoField from "../../components/controls/InfoField";
import { useDispatch, useSelector } from "react-redux";
import { createPhieuBanHang, updatePhieuBanHang } from "../../redux/actions/phieuBanHangAction";
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
  { id: "DonGia", label: "Đơn Giá" },
  { id: "SoLuong", label: "Số Lượng" },
  { id: "ThanhTien", label: "Thành Tiền" },
  { id: "HanhDong" },
];
const selectedProducts = [];
const PhieuBanHang = (props) => {
  //styles
  const classes = useStyles();
  //fetch
  const dispatch = useDispatch();
  //props
  const { products, sizes, users, isLoading } = props;
  //variables
  const [ignored, forceUpdate] = useState(false);
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [size, setSize] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
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
    if (amount === 0) {
      setAmountError(true);
      return;
    }
    if (!editing) 
    {
      if (selectedProducts.find(element => element.MaChiTietGiay === product.MaChiTietGiay))
        return;
      let tmp = sumTotal + total;
      setSumTotal(tmp);
      tmpGroupBoxes[1].value = tmp.toLocaleString("it-IT");
      setGroupBoxes(tmpGroupBoxes);
      let shoe = { ...product, total, amount, size, maxAmount };
      selectedProducts.push(shoe);
      resetField();
    }
    else 
    {
      let tmp = sumTotal + total - product.total;
      setSumTotal(tmp);
      tmpGroupBoxes[1].value = tmp.toLocaleString("it-IT");
      setGroupBoxes(tmpGroupBoxes);
      product.total = total;
      product.amount = amount;
      product.size = size;
      resetField();
    }
    forceUpdate(!ignored);
  };
  const handleRemoveClick = (item) => {
    selectedProducts.splice(selectedProducts.indexOf(item), 1);
    let tmp = sumTotal - item.total;
    setSumTotal(tmp);
    tmpGroupBoxes[1].value = tmp.toLocaleString("it-IT");
    setGroupBoxes(tmpGroupBoxes);
  };
  const handleEditClick = (item) => {
    setProduct(item);
    forceUpdate(!ignored);
    setEditing(true);
    setAmount(item.amount);
    setTotal(item.total);
    setMaxAmount(item.maxAmount);
    setOpenPopup(true);
  };
  //handle submit
  const handleSubmitClick = () => 
  {
    var isAbleToSubmit = false;
    tmpGroupBoxes.forEach((element,index) => 
    {
      console.log(index,element.value);
      element.error = element.checkValidation(element.value);
      if (element.error === true)
        isAbleToSubmit = true;
    });
    setGroupBoxes(tmpGroupBoxes);
    if (isAbleToSubmit === true)
      forceUpdate(!ignored);
    else 
    {
      //set default date
      if (groupBoxes[4].value === undefined) 
      {
        let date = new Date().getDate();
        if (date < 10) date = '0' + date;
        let month = new Date().getMonth() + 1;
        if (month < 10) month = '0' + month;
        tmpGroupBoxes[4].value = new Date().getFullYear() + "-" + month + "-" + date;
        setGroupBoxes(tmpGroupBoxes);
      }
      //get record
      let record = {
        MaNguoiDung: 2,
        MaKhachHang: groupBoxes[0].value === undefined ? 1 : groupBoxes[0].value.value,
        TongTien: sumTotal,
        PhuongThucThanhToan: groupBoxes[2].value === undefined ? "Thanh toán trực tiếp" : groupBoxes[2].value.label,
        NgayBan: groupBoxes[4].value,
        GhiChu: groupBoxes[5].value === undefined ? null : groupBoxes[5].value,
        ChiTietPhieuBanHang: selectedProducts.map(element => {
          return {
            MaChiTietGiay: element.MaChiTietGiay,
            SoLuongMua: element.amount,
            GiaBan: element.DonGia,
            ThanhTien: element.total
          };
        })
      }
      console.log(record);
      dispatch(createPhieuBanHang(record));
      //to do: Add success later
      //item.SoPhieuBanHang === null ? dispatch(createPhieuBanHang(item)) : dispatch(updatePhieuBanHang(item.SoPhieuBanHang, item));
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
          setTotal(Number(tmp) * product.DonGia);
          if (Number(tmp) > 0 && Number(tmp) <= maxAmount)
            setAmountError(false);
          else
            setAmountError(true);
        }
    }
  };
  const onSizeChange = (e, size, MaChiTietGiay) => {
    setSize(size);
    setMaxAmount(e);
    setAmount(e);
    setTotal(e * product.DonGia);
    product.MaChiTietGiay = MaChiTietGiay;
  }
  const resetField = () => {
    setProduct(null);
    setAmount(0);
    setMaxAmount(0);
    setTotal(0);
    setSize(0);
    setEditing(false);
  }
  let tmpGroupBoxes = [
    {
      type: "Select",
      title: "Tên Khách Hàng",
      required: true,
      onChange: (e) => {tmpGroupBoxes[0].value = e; tmpGroupBoxes[0].error = false;},
      options: [],
      validationTip: "Tên Khách Hàng không được trống",
      error: false,
      checkValidation: (val) => val === undefined ? true : false,
    },
    {
      type: "TextBox",
      title: "Tổng Tiền",
      required: true,
      disabled: "disabled",
      value: 0,
      validationTip: "Tổng Tiền không được bằng 0",
      error: false,
      checkValidation: (val) => {
        if (val === 0) return true;
        return false;
      },
    },
    {
      type: "Select",
      title: "Phương Thức Thanh Toán",
      required: true,
      options: [
        { value: "Thanh toán trực tiếp", label: "Thanh toán trực tiếp" },
        { value: "Thanh toán online", label: "Thanh toán online" },
      ],
      error: false,
      onChange: (e) => (tmpGroupBoxes[2].value = e),
      checkValidation: (val) => false,
    },
    {
      type: "TextBox",
      title: "Người Lập",
      required: true,
      disabled: "disabled",
      checkValidation: (val) => false,
    },
    {
      type: "Picker",
      title: "Ngày Lập",
      onChange: (e) => (tmpGroupBoxes[4].value = e.target.value),
      required: true,
      checkValidation: (val) => false,
    },
    {
      type: "TextBox",
      title: "Ghi Chú",
      onChange: (e) => (tmpGroupBoxes[5].value = e.target.value),
      required: false,
      checkValidation: (val) => false,
    }];
  const [groupBoxes, setGroupBoxes] = useState([]);
  //Field titles
  useEffect(() => {
    tmpGroupBoxes[0].options = users.map(element => { return { value: element.MaNguoiDung, label: element.TenNguoiDung } });
    setGroupBoxes(tmpGroupBoxes);
  }, [users]);
  return (
    <>
      {isLoading || groupBoxes === [] || users === [] || products === [] || sizes === [] ?
        (<h1>Loading</h1>)
        :
        (
          <Grid container spacing={0}>
            {/* bill */}
            <Paper className={classes.paper} style={{ width: "20%" }}>
              <InfoField
                GroupBoxes={groupBoxes}
                cardHeader="Thông Tin Phiếu"
                buttonContent="Lập Phiếu"
                disabled={selectedProducts.length === 0 ? "disabled" : ""}
                onClick={handleSubmitClick}
              />
            </Paper>
            {/* bill details */}
            <Paper
              className={classes.paper}
              style={{ width: "72%", margin: 0 }}
            >
              <label className={classes.cardHeader}>Thông Tin Giày</label>
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
                    <td width="15%">
                      {product === null
                        ?
                        <GroupBox
                          key={2}
                          type="TextBox"
                          title={headCells[2].label}
                          disabled="disabled"
                        />
                        :
                        (editing
                          ?
                          <GroupBox
                            key={2}
                            type="TextBox"
                            title={headCells[2].label}
                            disabled="disabled"
                            value={sizes[product.size].TenSize}
                          />
                          :
                          <SizeSelector
                            key={2}
                            title="Size"
                            ListSize={sizes}
                            selectedSize={size}
                            onSizeChange={onSizeChange}
                            item={product}
                          />)}
                    </td>
                    <td width="15%">
                      <GroupBox
                        key={3}
                        value={
                          product === null
                            ? ""
                            : product.DonGia.toLocaleString("it-IT")
                        }
                        type="TextBox"
                        title={headCells[3].label}
                        disabled="disabled"
                      />
                    </td>
                    <td width="12%">
                      <GroupBox
                        key={4}
                        value={amount}
                        type="Number"
                        title={headCells[4].label}
                        onChange={onAmountChange}
                        error={amountError}
                        validationTip={
                          "Số Lượng phải lớn hơn 0 và nhỏ hơn " + maxAmount
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
                          {item.DonGia.toLocaleString("it-IT")}
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
    </>
  );
};

export default PhieuBanHang;
