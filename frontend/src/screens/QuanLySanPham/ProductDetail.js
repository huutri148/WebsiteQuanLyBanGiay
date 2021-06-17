import React, { useState, useEffect } from "react";
import { makeStyles, Grid, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiaySize } from "../../redux/actions/giayAction";
import GroupBox from "../../components/controls/GroupBox/GroupBox";

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
    justifyContent: "center",
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
  },
  price: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",
    margin: "0px 8px",
  },
}));

const ProductDetail = (props) => {
  // CSS
  const classes = useStyles();
  // Props in component
  const [flag, setFlag] = useState(-1);
  const [chosenSize, setChosenSize] = useState();
  const { item } = props;

  // Fetch API
  const dispatch = useDispatch();
  const sizeGiay = useSelector((state) => state.SizeGiay);
  const sizeList = useSelector((state) => state.ListSize);
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
      setChosenSize("");
    } else if (chosenSize.MaSize !== size.MaSize) {
      setChosenSize(size);
    }
  };

  return (
    <div className={classes.root}>
      {sizeLoading ? (
        <CircularProgress disableShrink />
      ) : sizeError ? (
        <h1>{sizeError}</h1>
      ) : (
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
              title="Hãng Sản Xuất"
              value={item.TenHangSanXuat}
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
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ProductDetail;
