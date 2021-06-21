import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../redux/actions/gioHangAction";

export default function CartItem(props) {
  const dispatch = useDispatch();
  //const { cartItems, minusCount, plusCount, removeFromCart, updateCount } = useContext(CartContext)
  const Cart = useSelector((state) => state.Cart);
  const { cartItems } = Cart;

  const deleteFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const minusCount = (item) => {
    if (item.SoLuongMua > 0) {
      dispatch(addToCart(item, item.SoLuongMua - 1));
    }
  };
  const plusCount = (item) => {
    if (item.SoLuongMua < item.TongSoLuong) {
      dispatch(addToCart(item, item.SoLuongMua + 1));
    }
  };
  const updateCount = (event, item) => {
    const value = event.target.value;
    if (value > 0 && value < item.TongSoLuong) {
      dispatch(addToCart(item, value));
    } else if (value === 0) {
      dispatch(addToCart(item, 1));
    }
  };
  return (
    <div
      className="search-form login-form fadeToRight"
      style={{ width: "100%" }}
    >
      <div className="cart-list">
        {cartItems.length === 0 && (
          <div style={{ textAlign: "center", color: "#777" }}>
            No products in the cart.
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-item flex" style={{ border: "none" }}>
            <div
              className="cart-product-img flex"
              style={{ alignItems: "center", justifyContent: "flex-start" }}
            ></div>
            <div className="cart-product-mobile flex">
              <div
                className="cart-product-name flex-center"
                style={{ alignItems: "center", justifyContent: "flex-start" }}
              >
                Name
              </div>
              <div
                className="cart-product-amount flex-center"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                Amount
              </div>
              <div
                className="cart-product-price flex"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                Price
              </div>
              <div
                className="cart-product-totalprice flex"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                Total price
              </div>
              <div
                className="cart-product-delete"
                style={{ visibility: "hidden" }}
              >
                <FontAwesomeIcon
                  style={{ pointerEvents: "none" }}
                  icon={faTimes}
                />
              </div>
            </div>
          </div>
        )}
        {cartItems.map((item, index) => {
          return (
            <div className="cart-item flex" key={index}>
              <div className="cart-product-img">
                {item.Anh && (
                  <img src={item.Anh} width="80px" height="100%" alt=""></img>
                )}
              </div>
              {item.DonGiaBan && (
                <div className="cart-product-mobile flex">
                  <div
                    className="cart-product-name flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.TenGiay}
                  </div>
                  <div className="cart-product-amount flex-center">
                    <div className="count-cart noselect">
                      <div
                        className="count-cart-item left flex-center"
                        id={item.MaGiay}
                        onClick={() => minusCount(item)}
                      >
                        <FontAwesomeIcon
                          style={{ pointerEvents: "none" }}
                          icon={faMinus}
                        />
                      </div>
                      <div className="count-cart-item text flex-center">
                        <form
                          style={{ width: "100%", margin: "0", height: "30px" }}
                        >
                          <input
                            style={{
                              width: "100%",
                              margin: "0",
                              height: "30px",
                            }}
                            type="text"
                            value={item.SoLuongMua}
                            id={item.MaGiay}
                            onChange={(e) => updateCount(e, item)}
                          />
                        </form>
                      </div>
                      <div
                        className="count-cart-item right flex-center"
                        id={item.MaGiay}
                        onClick={() => plusCount(item)}
                      >
                        <FontAwesomeIcon
                          style={{ pointerEvents: "none" }}
                          icon={faPlus}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="cart-product-price flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {item.DonGiaBan.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )}{" "}
                    đ
                  </div>
                  <div
                    className="cart-product-totalprice flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {(item.DonGiaBan * item.SoLuongMua)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </div>
                  <div
                    className="cart-product-delete"
                    onClick={() => deleteFromCart(item.MaGiay)}
                    id={item.MaGiay}
                  >
                    <FontAwesomeIcon
                      style={{ pointerEvents: "none" }}
                      icon={faTimes}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
