import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
    textTransform: "none",
    fontSize: 32,
    color: "darkslateblue",
    fontWeight: "Bold",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();
  const node = useRef(null);
  const handleClick = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      //outside clicks
      setOpenPopup(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [node]);
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      TransitionComponent={Transition}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex", backgroundColor: "primary" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div ref={node}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
