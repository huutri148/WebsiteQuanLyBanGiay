import React from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "scale-down",
    marginRight: "10px",
    "&:hover": {
      transform: "scale(5,5) translate(50px,0)",
      zindex: 2000,
    },
  },
  title: {
    maxWidth: "90%",
    fontWeight: "bold",
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item lg={2}>
        <img src={props.imgUrl} className={classes.image} alt={props.Primary} />
      </Grid>
      <Grid item lg={10}>
        <Typography className={classes.title}>{props.PrimaryText}</Typography>
        <Typography color="textSecondary" variant="body2">
          {props.SecondaryText}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProductCard;
