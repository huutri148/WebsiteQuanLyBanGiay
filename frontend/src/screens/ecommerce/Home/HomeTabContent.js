import React, { useState } from "react";
import "../../../components/App/App.css";
import Product from "../Product/Product.js";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PopupProduct from "../Product/PopupProduct";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function HomeTabContent(props) {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [chosenProduct, setChosenProduct] = useState({});
  const products = props.products;
  const height = props.height;

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLimit(limit + 5);
    }, 1500);
  };

  //Limit products
  const limitProducts = products.slice(0, limit);
  const handleOpen = (item) => {
    setChosenProduct(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className="BestSeller" style={{ minHeight: `${height}px` }}>
        {limitProducts.map(function (item, index) {
          return (
            <Product
              key={index}
              product={item}
              index={index}
              OpenPopup={handleOpen}
              ClosePopup={handleClose}
            />
          );
        })}
        {limitProducts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              textTransform: "capitalize",
              marginTop: "150px",
            }}
          >
            there's nothing here yet
          </div>
        )}
      </div>
      {products.length > 10 && products.length >= limit && (
        <div className="tab-loadmore flex-center">
          <div className="tab-loadmore-btn btn" onClick={handleClick}>
            Load More
          </div>
          {loading === true && (
            <div className="tab-loadmore-btn tab-loadmore-loading btn-nothover">
              <div className="loading-icon"></div>
            </div>
          )}
        </div>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <PopupProduct item={chosenProduct} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
