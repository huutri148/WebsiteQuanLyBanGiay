import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/gioHangAction";
import { fetchGiaySize } from "../../../redux/actions/giayAction";
import GroupBox from "../../../components/controls/GroupBox/GroupBox";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  image: {
    objectFit: "cover",
    width: "80%",
    maxHeight: "100%",
  },
  sizeChips: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: "2px",
    border: "1px solid rgba(0,0,0,.09)",
    cursor: "pointer",
    boxSizing: "border-box",
    margin: "0 8px 8px 0",
    minWidth: "4rem",
    minHeight: "2.125rem",
  },
  buttonSelected: {
    color: "#ee4d2d",
    borderColor: "#ee4d2d",
    backgroundColor: "#fff",
    borderRadius: "2px",
    border: "1px solid rgba(0,0,0,.09)",
    cursor: "pointer",
    boxSizing: "border-box",
    margin: "0 8px 8px 0",
    minWidth: "4rem",
    minHeight: "2.125rem",
  },
  price: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "0px 8px",
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
}));
const PopupProduct = (props) => {
  const classes = useStyles();
  // Props in component
  const [flag, setFlag] = useState(-1);
  const [chosenSize, setChosenSize] = useState();
  const { item } = props;

  // Fetch API
  const dispatch = useDispatch();
  const sizeGiay = useSelector((state) => state.SizeGiay);
  const sizeList = useSelector((state) => state.ListSize);
  const user = useSelector((state) => state.User);
  const { userInfo } = user;
  const { loading: sizeLoading, error: sizeError, giaySize } = sizeGiay;
  const { listSize } = sizeList;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async (id) => {
      await dispatch(fetchGiaySize(id));
    };
    fetchData(item.MaGiay);
  }, [dispatch, item.MaGiay]);

  //Choose size to see quatity
  const handleChange = (size) => {
    if (flag < 0) {
      setFlag(1);
      setChosenSize(size);
    } else if (chosenSize.MaSize === size.MaSize) {
      setFlag(-1);
      setChosenSize(null);
    } else if (chosenSize.MaSize !== size.MaSize) {
      setChosenSize(size);
    }
  };
  const addClick = () => {
    if (userInfo.MaNguoiDung) {
      const chiTiet = {
        ...chosenSize,
        ...item,
      };
      dispatch(addToCart(chiTiet, 1));
    } else {
      toast.warning("Please login first!");
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <img src={item.Anh} alt={item.TenGiay} className={classes.image} />
          <div className={classes.price}>
            <label style={{ margin: "8px 8px" }}>Giá Bán:</label>
            <div
              style={{
                margin: "4px 0px",
                color: "darkslateblue",
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              {Number(item.DonGiaBan).toLocaleString("it-IT") + " VNĐ"}
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <GroupBox
            type="TextBox"
            title="Tên Giày"
            value={item.TenGiay}
            readOnly={true}
            required={true}
          />
          <GroupBox
            type="TextBox"
            title="Giới Tính"
            value={item.GioiTinh}
            readOnly={true}
            required={true}
          />
          <GroupBox
            type="TextBox"
            title={flag < 0 ? "Tổng số lượng" : "Số lượng"}
            value={flag < 0 ? item.TongSoLuong : chosenSize.SoLuong}
            readOnly={true}
            required={true}
          />
          <div className={classes.sizeChips}>
            <label>Size:</label>
            {Object.keys(giaySize).map((key) => {
              return (
                <button
                  className={
                    chosenSize
                      ? chosenSize.MaSize === giaySize[key].MaSize
                        ? classes.buttonSelected
                        : classes.button
                      : classes.button
                  }
                  onClick={(e) => handleChange(giaySize[key])}
                >
                  {listSize[key].TenSize}{" "}
                </button>
              );
            })}
          </div>
          <div className={classes.addButton}>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
              startIcon={<AddShoppingCartIcon />}
              disabled={chosenSize !== null ? false : true}
              onClick={addClick}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PopupProduct;
