import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles({
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
    maxWidth: "50%",
  },
});

const ProductCard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img
        src={props.imgUrl}
        className={classes.image}
        alt={props.productName}
      />
      <Typography component="h4" variant="h6" className={classes.title}>
        {props.productName}
      </Typography>
    </div>
  );
};

export default ProductCard;
