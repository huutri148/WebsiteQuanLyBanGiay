import React, { useContext, useEffect, useRef, useState } from "react";
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
//import ReactStars from "react-rating-stars-component";

export default function ProductBody(props) {
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
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoom(`${x}% ${y}%`);
  };

  const [imgIndex, setImgIndex] = useState(0);
  const [countCart, setCountCart] = useState(1);
  const [hover, setHover] = useState(false);
  const [zoom, setZoom] = useState(`0% 0%`);
  const productSmall = useRef(null);

  useEffect(() => {
    console.log(hover);
    // if (hover === false) {
    //     var interval = setInterval(() => {
    //         setImgIndex(imgIndex => imgIndex + 1);
    //     }, 1000);
    // }
    // return() => {
    //     clearInterval(interval);
    // }
  }, [hover]);

  let slugSex = "";
  let ratingList = "";
  let product = "";
  let ratingStar = {};
  if (props.product) {
    product = props.product;
    slugSex = "/" + slugify(product.productSex === "Woman" ? "Women" : "Men");
    // if (imgIndex >= product.productImg.length) {
    //infinity slider loop
    // setProductImgBig(productImgBig.concat(props.productImg))
    setImgIndex(0);
    // }

    if (window.innerWidth > 900) {
      productSmall.current.style.transform = `translateY(0px)`;
    }
  }

  const sliderWidth = useRef(null);
  const [loading, setLoading] = useState(0);
  //   const { addToCart, addToWishList } = useContext(CartContext);
  const cartClick = () => {
    setLoading(1);
    setTimeout(() => {
      setLoading(0);
      //addToCart(product, countCart);
    }, 500);
    setCountCart(1);
  };
  const wishListClick = () => {
    setLoading(2);
    setTimeout(() => {
      setLoading(0);
      //addToWishList(product);
    }, 500);
  };

  return (
    <div className="ProductBody">
      <div className="product-breadcrumb flex">
        <Link to="/" className="breadcrumb-item breadcrumb-link">
          Home
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="breadcrumb-arrow" />
        <Link to={slugSex} className="breadcrumb-item breadcrumb-link">
          {product.GioiTinh === "Nu" ? "Women" : "Men"}
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="breadcrumb-arrow" />
        <div className="breadcrumb-item breadcrumb-product">
          {product.TenGiay}
        </div>
      </div>

      <div className="product-detail flex">
        <div
          className="product-gallery flex"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div className="product-small" ref={productSmall}>
            <div className={"product-small-item"}>
              <img src={product.Anh} alt=""></img>
            </div>
          </div>
          <div
            className="product-slider flex"
            onMouseMove={handleMouseMove}
            ref={sliderWidth}
          >
            <div className="product-tag">
              <div className="product-tag-item new">NEW</div>
            </div>

            <div className="change-product left">
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </div>
            <div className="change-product right">
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className="product-info-detail">
          <div className="product-info-title">{product.TenGiay}</div>
          <div className="product-info-des">{product.MoTa}</div>
          {/* <div 
                        className="product-info-vote"
                        onClick={props.scrollOnLick}
                        >
                        <div style={{height: '40px'}}>
                            {Object.keys(ratingStar).length !== 0 && <ReactStars {...ratingStar} />}
                        </div>
                        <p>
                            ({ratingList.length} customer reviews)
                        </p>
                    </div> */}

          <div className="product-info-price">
            {` ${product.DonGiaBan}  VNĐ`}
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
                onClick={cartClick}
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
          <div className="product-info-line"></div>

          <div className="product-info-line"></div>
        </div>
      </div>
      <div className="product-info-line mobile-disable-line"></div>
    </div>
  );
}
