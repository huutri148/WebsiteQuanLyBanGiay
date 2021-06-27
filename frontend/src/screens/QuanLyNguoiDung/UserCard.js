import React from "react";
import { makeStyles, Typography, Avatar } from "@material-ui/core";
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
    marginRight: "10px",
  },
  title: {
    maxWidth: "90%",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <Avatar
          src={props.imgUrl}
          className={classes.image}
          alt={props.Primary}
        />
      </div>
      <div>
        <Typography className={classes.title}>{props.PrimaryText}</Typography>
        <Typography color="textSecondary" variant="body2">
          {props.SecondaryText}
        </Typography>
      </div>
    </div>
  );
};

export default ProductCard;
