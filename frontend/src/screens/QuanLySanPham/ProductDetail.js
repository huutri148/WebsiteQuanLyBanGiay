import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GroupBox from "../../components/controls/GroupBox";
import Chip from "@material-ui/core/Chip";
const listSize = [
  {
    MaSize: 1,
    TenSize: "36",
    SoLuong: 12,
  },
  {
    MaSize: 2,
    TenSize: "37",
    SoLuong: 122,
  },
  {
    MaSize: 3,
    TenSize: "38",
    SoLuong: 100,
  },
  {
    MaSize: 4,
    TenSize: "39",
    SoLuong: 10,
  },
  {
    MaSize: 5,
    TenSize: "40",
    SoLuong: 22,
  },
  {
    MaSize: 6,
    TenSize: "41",
    SoLuong: 133,
  },
  {
    MaSize: 7,
    TenSize: "42",
    SoLuong: 122,
  },
  {
    MaSize: 8,
    TenSize: "43",
    SoLuong: 122,
  },
];
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
}));

const ProductDetail = (props) => {
  const classes = useStyles();
  const [flag, setFlag] = useState(-1);
  const [chosenSize, setChosenSize] = useState(listSize[0]);
  const { item } = props;

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
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <img src={item.Anh} alt={item.TenGiay} className={classes.image} />
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
            value={flag < 0 ? item.SoLuong : chosenSize.SoLuong}
            readOnly={true}
            required={true}
          />
          <div className={classes.sizeChips}>
            <label>Size:</label>
            {listSize.map((size) => {
              return (
                <Chip
                  size="small"
                  color={
                    chosenSize.MaSize === size.MaSize ? "primary" : "default"
                  }
                  label={size.TenSize}
                  onClick={(e) => handleChange(size)}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
