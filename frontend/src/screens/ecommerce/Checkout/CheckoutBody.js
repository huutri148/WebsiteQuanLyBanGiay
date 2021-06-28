import React, { useEffect, useState } from "react";
import "../../../styles/bannerV4.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import socketIOClient from "socket.io-client"
//import { ZaloPay } from './ZaloPay/zalopay';
import QRCode from "qrcode.react";
import { createCart as taoGioHang } from "../../../redux/actions/gioHangAction";
//import { APIs } from "./ZaloPay/common";
//import $ from "jquery";

function CheckoutBody(props) {
  //const socket = socketIOClient(ENDPOINT)
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.User);
  const { cartItems } = useSelector((state) => state.Cart);
  const [nameInput, setNameInput] = useState("");
  const [_id, set_Id] = useState("");
  const [userAvt, setUserAvt] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [addressInput, setAddressInput] = useState(null);
  const [cartList, setCartList] = useState([]);
  const subTotal = cartItems.reduce(
    (result, item) => result + item.ThanhTien,
    0
  );
  const [shipping, setShipping] = useState(0);
  const total = Number(subTotal) + Number(shipping);
  const [confirm, setConfirm] = useState(false);
  const [orderPaymentMethod, setOrderPaymentMethod] = useState("");
  const [orderAddressConfirm, setOrderAddressConfirm] = useState("");
  const [isShowQR, setIsShowQR] = useState(false);
  const [qrValue, setQRValue] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setUserAvt(userInfo.Avatar);
      set_Id(userInfo.MaNguoiDung);
      setNameInput(userInfo.TenNguoiDung);
      setEmailInput(userInfo.Email);
      setPhoneInput(userInfo.SDT);
      setAddressInput(userInfo.DiaChi);
    }
    setCartList(cartItems);
  }, [userInfo]);

  const [methodPayment, setMethodPayMent] = useState(0);

  const checkedPayMent = (event) => {
    setMethodPayMent(Number(event.target.id));
  };

  const showQR = (text) => {
    setIsShowQR(true);
    setQRValue(text);
  };

  const placeAnOrder = () => {
    let orderPaymentMethod2 = "";
    if (methodPayment === 1) {
      orderPaymentMethod2 = "Trả tiền mặt khi nhận hàng";
    } else if (methodPayment === 2) {
      orderPaymentMethod2 = "Thanh toán qua Momo";
    } else {
      orderPaymentMethod2 = "";
    }

    if (orderPaymentMethod2 === "") {
      alert("Fill in all infomation please");
    } else {
      const chiTiet = cartItems.reduce((result, item) => {
        result.push({
          MaChiTietGiay: item.MaChiTietGiay,
          SoLuongMua: item.SoLuongMua,
          GiaBan: item.DonGiaBan,
          ThanhTien: item.ThanhTien,
        });
        return result;
      }, []);
      const cart = {
        MaNguoiDung: userInfo.MaNguoiDung,
        ChiTietGioHang: chiTiet,
        PhuongThucThanhToan: orderPaymentMethod2,
      };
      dispatch(taoGioHang(cart));
      setTimeout(() => {
        setConfirm(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
        //socket.emit('placeAnOrder', data)
      }, 1000);
    }
    setOrderPaymentMethod(orderPaymentMethod2);
    let addressStr = addressInput;
    setOrderAddressConfirm(addressStr);
  };

  return (
    <div className="CheckoutBody">
      {confirm && (
        <div className="billing-detail confirmPage">
          <p style={{ fontSize: "18px", color: "green", marginBottom: "30px" }}>
            Cảm ơn bạn đã đặt hàng của shop.
          </p>
          <div className="billing-detail-title">Đơn hàng</div>
          <div>
            <div className="billing-detail-list comfirm-list">
              {cartList &&
                cartList.map((item, index) => {
                  return (
                    <div key={index} className="billing-detail-item">
                      <div style={{ width: "300px" }}>
                        <img
                          src={item.Anh}
                          alt=""
                          width="60px"
                          height="60px"
                        ></img>
                      </div>
                      <div className="billing-detail-mobile">
                        <div className="billing-detail-name">
                          {item.TenGiay}
                        </div>
                        <div className="billing-detail-count">
                          <p>x</p>
                          {item.SoLuongMua}
                        </div>
                        <div className="billing-detail-price">
                          {(item.DonGiaBan * item.SoLuongMua)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          đ
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className="billing-detail-item flex">
                <div className="billing-confirm-left">Tổng cộng</div>
                <div className="billing-detail-mobile">
                  <div className="billing-detail-name"></div>
                  <div
                    className="billing-detail-count"
                    style={{ color: "#111" }}
                  ></div>
                  {subTotal && (
                    <div className="billing-detail-price billing-confirm-right">
                      {subTotal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      đ
                    </div>
                  )}
                </div>
              </div>
              <div
                className="billing-detail-item flex"
                style={{ justifyContent: "space-between" }}
              >
                <div className="billing-confirm-left">ADDRESS</div>
                <div className="billing-detail-mobile">
                  <div className="billing-detail-name"></div>
                  <div
                    className="billing-detail-count"
                    style={{ color: "#111" }}
                  ></div>
                  <div
                    className="billing-detail-price billing-confirm-right orderAddressConfirm"
                    style={{ textTransform: "capitalize" }}
                  >
                    {orderAddressConfirm} đ
                  </div>
                </div>
              </div>
              <div className="billing-detail-item flex">
                <div className="billing-confirm-left">Phí giao hàng</div>
                <div className="billing-detail-mobile">
                  <div className="billing-detail-name"></div>
                  <div
                    className="billing-detail-count"
                    style={{ color: "#111" }}
                  ></div>
                  <div
                    className="billing-detail-price billing-confirm-right"
                    style={{ textTransform: "capitalize" }}
                  >
                    {shipping} đ
                  </div>
                </div>
              </div>
              <div className="billing-detail-item flex">
                <div className="billing-confirm-left">Tổng số tiền</div>
                <div className="billing-detail-mobile">
                  <div className="billing-detail-name"></div>
                  <div
                    className="billing-detail-count"
                    style={{ color: "#111" }}
                  ></div>
                  <div className="billing-detail-price billing-confirm-right">
                    {(Number(subTotal) + Number(shipping))
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </div>
                </div>
              </div>
              <div className="billing-detail-item flex">
                <div className="billing-confirm-left">
                  Phương thức thanh toán
                </div>
                <div className="billing-detail-mobile">
                  <div className="billing-detail-name"></div>
                  <div
                    className="billing-detail-count"
                    style={{ color: "#111" }}
                  ></div>
                  <div
                    className="billing-detail-price billing-confirm-right"
                    style={{ textTransform: "capitalize" }}
                  >
                    {orderPaymentMethod}
                  </div>
                </div>
              </div>
              <div
                className="order-btn btn"
                style={{ marginTop: "30px", marginBottom: "30px" }}
                onClick={() => {
                  document.body.style.overflow = "unset";
                  localStorage.removeItem("cartItems");
                  props.history.push("/shop");
                  window.location.reload(false);
                }}
              >
                Trở về
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="billing-detail">
        <div className="billing-detail-title">Chi tiết đơn hàng</div>
        <form className="billing-detail-form">
          <table className="billing-detail-table">
            <tbody>
              <tr>
                <td>Tên</td>
                <td>
                  <input
                    type="text"
                    className="input"
                    name="name"
                    value={nameInput}
                    onChange={(event) => {
                      setNameInput(event.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Số điện thoại</td>
                <td>
                  <input
                    type="text"
                    className="input"
                    name="phone"
                    value={phoneInput}
                    onChange={(event) => {
                      setPhoneInput(event.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="text"
                    className="input"
                    name="phone"
                    value={emailInput}
                    onChange={(event) => {
                      setEmailInput(event.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Địa chỉ</td>
                <td>
                  <input
                    type="text"
                    className="input"
                    name="address"
                    value={addressInput || ""}
                    onChange={(event) => {
                      setAddressInput(event.target.value);
                    }}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="billing-detail">
        <div className="billing-detail-title">Đơn hàng</div>
        <div className="billing-detail-form">
          <div className="billing-detail-list">
            {cartList &&
              cartList.map((item, index) => {
                return (
                  <div key={index} className="billing-detail-item">
                    <img src={item.Anh} alt="" width="60px" height="60px"></img>
                    <div className="billing-detail-mobile">
                      <div className="billing-detail-name">{item.TenGiay}</div>
                      <div className="billing-detail-count">
                        <p>x</p>
                        {item.SoLuongMua}
                      </div>
                      <div className="billing-detail-price">
                        {(item.DonGiaBan * item.SoLuongMua)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        đ
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="billing-detail-item flex">
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  lineHeight: "60px",
                  fontSize: "18px",
                }}
              >
                Tổng
              </div>
              <div className="billing-detail-mobile">
                <div className="billing-detail-name"></div>
                <div
                  className="billing-detail-count"
                  style={{ color: "#111" }}
                ></div>
                {subTotal && (
                  <div className="billing-detail-price">
                    {subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </div>
                )}
              </div>
            </div>
            <div
              className="billing-detail-item flex"
              style={{ justifyContent: "space-between" }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  lineHeight: "60px",
                  fontSize: "18px",
                }}
              >
                Phí
              </div>
              <div className="billing-detail-shipping">
                <select
                  onChange={(event) => {
                    setShipping(event.target.value);
                  }}
                >
                  <option value="0">Giao miễn phí - 0đ</option>
                  <option value="30000">Giao hàng nhanh - 30000đ</option>
                </select>
              </div>
            </div>
            <div className="billing-detail-item flex">
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  lineHeight: "60px",
                  fontSize: "18px",
                }}
              >
                TOTAL
              </div>
              <div className="billing-detail-mobile">
                <div className="billing-detail-name"></div>
                <div
                  className="billing-detail-count"
                  style={{ color: "#111" }}
                ></div>
                <div className="billing-detail-price">
                  {(Number(subTotal) + Number(shipping))
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  đ
                </div>
              </div>
            </div>
            <div className="billing-detail-payment">
              <div style={{ fontSize: "18px" }}>Phương thức thanh toán</div>
              <div className="billing-detail-mobile">
                <div className="payment-method-list">
                  <div
                    id="1"
                    className="flex payment-method-item"
                    onClick={(event) => {
                      checkedPayMent(event);
                      setIsShowQR(false);
                    }}
                  >
                    <div
                      id="1"
                      className={
                        methodPayment === 1
                          ? "size-check isChecked2"
                          : "size-check"
                      }
                    ></div>
                    <p id="1">Trả tiền mặt khi nhận hàng</p>
                  </div>
                  <div
                    id="2"
                    className="flex payment-method-item"
                    onClick={(event) => {
                      checkedPayMent(event);
                      const description = `Thanh toan don hang #${_id}`;
                      let order = {
                        description: description,
                        amount: total,
                      };
                      showQR("https://nhantien.momo.vn/0866074947");
                      setIsPaid(true);
                      //     ZaloPay.qr(order, res => {
                      //         showQR(res.orderurl);
                      //         const check = setInterval(()=>{
                      //             $.getJSON(APIs.GETORDERSTATUS +'?morderid='+ res.apptransid)
                      //                 .done(res => {
                      //                     if (res.returncode === 1) {
                      //                         setIsPaid(true)
                      //                         clearInterval(check)
                      //                     }
                      //                 }
                      //             )
                      //         }, 1000)
                      //     });
                    }}
                  >
                    <div
                      id="2"
                      className={
                        methodPayment === 2
                          ? "size-check isChecked2"
                          : "size-check"
                      }
                    ></div>
                    <p id="2">Thanh toán qua Momo bằng QRcode</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={isShowQR ? "qr-box flex-col" : "d-none"}>
              <div className="qr-code-box flex-center">
                <QRCode value={qrValue}></QRCode>
              </div>
              {!isPaid && (
                <div className="qr-status" style={{ color: "red" }}>
                  Đang chờ thanh toán...
                </div>
              )}
              {isPaid && (
                <div className="qr-status">
                  Thanh toán giúp mình bằng Momo nhé!
                </div>
              )}
              {!isPaid && (
                <div className="qr-help">
                  <div className="qr-help-title">Hướng dẫn thanh toán</div>
                  <ul className="qr-help-list">
                    <li>
                      <span>Bước 1:</span>
                      <strong> Mở</strong> ứng dụng <strong>ZaloPay</strong>
                    </li>
                    <li>
                      <span>Bước 2:</span> Chọn <strong>"Thanh Toán"</strong> và
                      quét mã QR
                    </li>
                    <li>
                      <span>Bước 3:</span> <strong> Xác nhận thanh toán</strong>{" "}
                      ở trong ứng dụng
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="order-btn btn" onClick={placeAnOrder}>
              Đặt hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CheckoutBody);
