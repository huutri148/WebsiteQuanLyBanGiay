import React, { useState } from "react";
import "../../../components/App/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

function ProductOverlay(props) {
  const [loading, setLoading] = useState(0);

  //const { addToCart, addToWishList } = useContext(CartContext);

  const cartClick = () => {
    // setTimeout(() => {
    //   setLoading(0);
    //   dispatch(addToCart(props.product, 1));
    // }, 500);
    props.OpenPopup(props.product);
  };

  const wishListClick = () => {
    setLoading(2);
    setTimeout(() => {
      setLoading(0);
      //addToWishList(props.product);
    }, 500);
  };

  const redirect = (event) => {
    if (event.target.id === "overlay") {
      // window.scrollTo(0,0);
      props.history.push(`/products/${props.product.MaGiay}`);
    }
  };

  return (
    <div className="product-overlay" id="overlay" onClick={redirect}>
      <div
        className="product-icon-box flex-center icon-cart btn"
        onClick={cartClick}
      >
        {loading === 1 && <div className="loading-icon"></div>}
        {loading !== 1 && (
          <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: "3px" }} />
        )}
      </div>
      <div
        className="product-icon-box flex-center icon-wishlist btn"
        onClick={wishListClick}
      >
        {loading === 2 && <div className="loading-icon"></div>}
        {loading !== 2 && <FontAwesomeIcon icon={faHeart} />}
      </div>
      <div
        className="product-icon-box flex-center icon-view btn"
        onClick={props.openView}
      >
        <FontAwesomeIcon icon={faEye} />
      </div>
    </div>
  );
}
export default withRouter(ProductOverlay);
