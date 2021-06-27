import React, { useEffect, useRef, useState } from "react";
import "../../../components/App/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCartPlus,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart as ThemGioHang } from "../../../redux/actions/gioHangAction";
import { fetchGiaySize } from "../../../redux/actions/giayAction";

export default function ProductBody(props) {
  const dispatch = useDispatch();
  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str; // Trim - from end of text
  }

  const [countCart, setCountCart] = useState(1);
  const [chosenSize, setChosenSize] = useState(null);
  const [flag, setFlag] = useState(-1);
  const { giaySize } = useSelector((state) => state.SizeGiay);
  const { listSize } = useSelector((state) => state.ListSize);

  let slugSex = "";
  let product = "";
  if (props.product) {
    product = props.product;
    slugSex = "/" + slugify(product.GioiTinh === "Woman" ? "Women" : "Men");
  }

  const [loading, setLoading] = useState(0);
  const cartClick = () => {
    setLoading(1);
    setTimeout(() => {
      setLoading(0);
      addToCart();
    }, 500);
    setCountCart(1);
  };
  const wishListClick = () => {
    setLoading(2);
    setTimeout(() => {
      setLoading(0);
      //addToWishList(product)
    }, 500);
  };
  const handleChange = (size) => {
    if (flag < 0) {
      setFlag(1);
      setChosenSize(size);
    } else if (chosenSize.MaSize === size.MaSize) {
      setFlag(-1);
      setChosenSize(null);
    } else if (chosenSize.MaSize !== size.MaSize) {
      setChosenSize(size);
    }
  };
  const addToCart = () => {
    const chiTiet = {
      ...chosenSize,
      ...product,
    };
    dispatch(ThemGioHang(chiTiet, countCart));
  };

  return (
    <div className="ProductBody">
      <div className="product-breadcrumb flex">
        <Link to="/" className="breadcrumb-item breadcrumb-link">
          Home
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="breadcrumb-arrow" />
        <Link to={slugSex} className="breadcrumb-item breadcrumb-link">
          {product.GioiTinh === "Woman" ? "Women" : "Men"}
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="breadcrumb-arrow" />
        <div className="breadcrumb-item breadcrumb-product">
          {product.TenGiay}
        </div>
      </div>

      <div className="product-detail flex">
        <div className="product-tag">
          <div className="product-tag-item new">NEW</div>
        </div>
        <div className="product-big flex">
          <div className="product-big-item">
            <img src={product.Anh} alt=""></img>
          </div>
        </div>
        <div className="product-info-detail">
          <div className="product-info-title">{product.TenGiay}</div>
          <div className="product-info-des">{product.MoTa}</div>

          {product.DonGiaBan && (
            <div className="product-info-price">
              {product.DonGiaBan.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "."
              )}{" "}
              VNĐ
            </div>
          )}

          <div className="product-info-size flex">
            {giaySize &&
              Object.keys(giaySize).map((key) => {
                return (
                  <div
                    className={
                      "product-info-chooseSize flex-center" +
                      (chosenSize
                        ? chosenSize.MaSize === giaySize[key].MaSize
                          ? " product-info-chosenSize"
                          : ""
                        : "")
                    }
                    onClick={() => handleChange(giaySize[key])}
                  >
                    {listSize[key].TenSize}{" "}
                  </div>
                );
              })}
          </div>
          <div className="product-info-cart flex">
            <div className="count-cart noselect">
              <div
                className="count-cart-item left flex-center"
                onClick={() => {
                  if (countCart > 1) setCountCart(countCart - 1);
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
              <div className="count-cart-item text flex-center">
                <form>
                  <input
                    type="text"
                    value={countCart}
                    onChange={(e) => {
                      setCountCart(Number(e.target.value.replace(/\D+/g, "")));
                    }}
                  />
                </form>
              </div>
              <div
                className="count-cart-item right flex-center"
                onClick={() => {
                  setCountCart(countCart + 1);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
            {loading === 1 && (
              <div
                className="product-info-addtocart flex-center btn"
                onClick={cartClick}
              >
                <div className="loading-icon"></div>
              </div>
            )}
            {loading !== 1 && (
              <div
                className="product-info-addtocart flex-center btn"
                onClick={chosenSize ? addToCart : ""}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <p>Add to cart</p>
              </div>
            )}
            {loading === 2 && (
              <div
                className="product-info-wishlist flex-center"
                onClick={cartClick}
              >
                <div className="loading-icon"></div>
              </div>
            )}
            {loading !== 2 && (
              <div
                className="product-info-wishlist flex-center"
                onClick={wishListClick}
              >
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="product-info-line mobile-disable-line"></div>
    </div>
  );
}
