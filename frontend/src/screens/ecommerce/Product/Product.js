import React, { useState } from "react";
import "../../../components/App/App.css";
import ProductQuickView from "./ProductQuickView";
import ProductOverlay from "./ProductOverlay";
import { withRouter } from "react-router-dom";

function Product(props) {
  const [hover, setHover] = useState(false);
  const [view, setView] = useState(false);
  const product = props.product;

  const closeView = (event) => {
    document.body.style.overflow = "unset";
    setView(false);
  };
  const openView = () => {
    setView(true);
  };
  if (view) {
    document.body.style.overflow = "hidden";
  }

  const redirect = (target) => {
    //window.scrollTo(0, 0);
    console.log(product.MaGiay);
    //props.history.push(`/products/${product.MaGiay}`);
  };

  return (
    <div
      className={`Product opa`}
      style={{
        width: `calc(${props.width} - 30px)`,
        height: `${props.parentHeight}`,
      }}
    >
      <ProductQuickView view={view} closeView={closeView} product={product} />
      <div
        className="product-img"
        style={{
          height: `${props.height}`,
        }}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
      >
        <div className="product-tag">
          <div className="product-tag-item new">NEW</div>
        </div>
        <div className="product-img-bg" onClick={redirect}>
          <img
            className=""
            src={product.Anh}
            style={{ objectFit: "scale-down" }}
            alt=""
          ></img>
        </div>
        <ProductOverlay
          product={product}
          openView={openView}
          OpenPopup={props.OpenPopup}
          ClosePopup={props.ClosePopup}
        />
      </div>
      <div className="product-title">{product.TenGiay}</div>
      {product.DonGiaBan && (
        <div className="product-price">
          <p>
            {product.DonGiaBan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
            VNĐ
          </p>
        </div>
      )}
    </div>
  );
}
export default withRouter(Product);
