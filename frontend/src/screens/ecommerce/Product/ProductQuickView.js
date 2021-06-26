import React, { useEffect, useState } from "react";
import "../../../styles/product.css";
import "../../../components/App/App.css";
import {
  faCartPlus,
  faCheckCircle,
  faHeart,
  faMinus,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchGiaySize } from "../../../redux/actions/giayAction";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/gioHangAction";

function ProductQuickView(props) {
  const dispatch = useDispatch();
  const [countCart, setCountCart] = useState(1);
  const [toast, setToast] = useState(false);
  const product = props.product;
  const [flag, setFlag] = useState(-1);
  const [chosenSize, setChosenSize] = useState();

  const { listSize } = useSelector((state) => state.ListSize);
  const { giaySize } = useSelector((state) => state.SizeGiay);

  useEffect(() => {
    const fetchData = async (id) => {
      await dispatch(fetchGiaySize(id));
    };
    fetchData(product.MaGiay);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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

  const cartClick = () => {
    const chiTiet = {
      ...chosenSize,
      ...product,
    };
    dispatch(addToCart(props.product, countCart));
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  const redirect = () => {
    window.scrollTo(0, 0);
    props.history.push(`/products/${props.product._id}`);
  };

  return (
    <div>
      <div
        className={
          props.view === true
            ? "ProductQuickView"
            : "ProductQuickView displayNone"
        }
      >
        <div className="productquickview-container flex" onClick={() => {}}>
          <div
            className="view-close flex-center"
            onClick={() => {
              props.closeView();
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </div>
          <div className="productquickview-slide">
            <div className="productquickview-tag"></div>
            {props.view === true && (
              <img src={product.Anh} alt="" className="view-img" />
            )}
          </div>

          <div
            className="product-info-detail"
            style={{ padding: "0", marginTop: "70px" }}
          >
            <div
              className="product-info-title"
              onClick={() => {
                props.closeView();
                redirect();
              }}
            >
              {product.TenGiay}
            </div>
            <div className="product-info-des" style={{ width: "80%" }}>
              {product.MoTa}
            </div>
            <div
              className="product-info-vote"
              style={{ textDecoration: "none", color: "#111" }}
              onClick={() => {
                props.closeView();
                redirect();
              }}
            ></div>

            <div className="product-info-price" style={{ marginTop: "30px" }}>
              {product.DonGiaBan.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "."
              )}{" "}
              VND
            </div>
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
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <input
                      type="text"
                      value={countCart}
                      onChange={(e) => setCountCart(Number(e.target.value))}
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
              <div
                className="product-info-addtocart flex-center btn"
                onClick={cartClick}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <p>Add to cart</p>
              </div>
              <div className="product-info-wishlist flex-center">
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProductQuickView);
