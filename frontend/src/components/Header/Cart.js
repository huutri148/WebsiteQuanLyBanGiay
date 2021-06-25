import React, { useState } from "react";
import "../App/App.css";
import "../../styles/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem";
import WishListItem from "./WishListItem";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCart as taoGioHang } from "../../redux/actions/gioHangAction";
import { toast } from "react-toastify";
function Account(props) {
  const dispatch = useDispatch();
  const [tabID, setTabID] = useState(0);
  const Cart = useSelector((state) => state.Cart);
  const user = useSelector((state) => state.User);
  const { cartItems } = Cart;
  const { userInfo } = user;

  const total = cartItems.reduce((result, item) => result + item.ThanhTien, 0);

  const createCart = () => {
    if (total > 0) {
      const chiTiet = cartItems.reduce((result, item) => {
        result.push({
          MaChiTietGiay: item.MaChiTietGiay,
          SoLuongMua: item.SoLuongMua,
          GiaBan: item.DonGiaBan,
          ThanhTien: item.ThanhTien,
          PhuongThucThanhToan: "Trả tiền mặt khi nhận hàng",
        });
        return result;
      }, []);
      const cart = {
        MaNguoiDung: userInfo.MaNguoiDung,
        ChiTietGioHang: chiTiet,
      };
      dispatch(taoGioHang(cart));
      window.location.reload(false);
    } else {
      toast.warning("Giỏ hàng hiện tại rỗng");
    }
  };
  return (
    <div className={props.cartOpen === false ? "Cart displayNone" : "Cart"}>
      <div className="search-header flex">
        <div className="search-title">Cart</div>
        <div className="search-close" onClick={props.clickToClose}>
          <FontAwesomeIcon icon={faTimes} className="icon" />
        </div>
      </div>
      <div className={props.cartOpen === false ? "" : "fadeIn"}>
        <div className="search-tab login-tab flex">
          <div
            className={
              tabID === 0
                ? "search-tab-cate search-tab-active"
                : "search-tab-cate"
            }
            onClick={() => setTabID(0)}
          >
            Cart
          </div>
          <div
            className={
              tabID === 1
                ? "search-tab-cate search-tab-active"
                : "search-tab-cate"
            }
            onClick={() => setTabID(1)}
          >
            Whishlist
          </div>
        </div>
        {tabID === 0 && <CartItem />}
        {tabID === 1 && <WishListItem />}
      </div>
      {tabID === 0 && (
        <div className="cart-checkout-box flex-center">
          <div className="cart-checkout-text flex">
            <p>Total: </p>
            {total && (
              <p>
                {" "}
                {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
              </p>
            )}
          </div>
          <div
            className="cart-checkout-btn btn"
            onClick={
              //props.history.push(`/checkout`);
              createCart
            }
          >
            Buy
          </div>
        </div>
      )}
    </div>
  );
}
export default withRouter(Account);
