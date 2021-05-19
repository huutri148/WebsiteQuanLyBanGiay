import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  Typography,
  Divider,
  Grid,
} from "@material-ui/core";
import Groupbox from "../../components/controls/GroupBox/GroupBox";
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "darkslateblue",
  },
  paper: {
    margin: theme.spacing(2, 8),
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
  image: {
    objectFit: "cover",
    width: "80%",
    maxHeight: "100%",
  },
  imageCard: {
    padding: "0px 10px",
    margin: "0px 20px",
  },
  informationCard: {
    padding: "0px 0px 0px 50px",
  },
}));
const ThemSanPham = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography component="h1" variant="h5" className={classes.title}>
        Thêm Sản Phẩm
      </Typography>
      <Paper spacing={0} className={classes.paper}>
        <label className={classes.cardHeader}>Thông tin sản phẩm</label>
        <Divider variant="middle" />
        <Grid container spacing={2} style={{ margin: "20px 0px" }}>
          <Grid xs={4} className={classes.imageCard}>
            <img src="/images/1.png" className={classes.image} alt="Image" />
          </Grid>
          <Grid xs={6} className={classes.informationCard}>
            <Groupbox
              type="TextBox"
              title="Tên Giày"
              required={true}
            ></Groupbox>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ThemSanPham;
