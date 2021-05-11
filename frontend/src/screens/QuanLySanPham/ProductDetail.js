import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ProductDetail = (props) => {
  const classes = useStyles();
  const { item } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <img src={item.imgURL} alt={item.TenGiay} />
        </Grid>
        <Grid item xs={6}>
          <h1>{item.TenGiay}</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
