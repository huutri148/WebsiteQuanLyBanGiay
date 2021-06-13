import React from "react";
import { makeStyles, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  Image: {
    marginBottom: "32px",
    objectFit: "scale-down",
  },
}));
const NotFound = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container} style={{ maxWidth: "320px" }}>
        <img className={classes.Image} src="/images/404.svg" alt="" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.history.push("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
