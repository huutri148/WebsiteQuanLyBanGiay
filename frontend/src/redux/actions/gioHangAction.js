import * as gioHangAPI from "../apis/gioHangAPI";
import * as gioHangConstants from "../../constants/gioHangConstant";
import { toast } from "react-toastify";
export const fetchListGioHang = () => async (dispatch) => {
  try {
    dispatch({ type: gioHangConstants.GIOHANG_LIST_REQUEST });

    const { data } = await gioHangAPI.getList();

    dispatch({
      type: gioHangConstants.GIOHANG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: gioHangConstants.GIOHANG_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const updateGioHang = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: gioHangConstants.GIOHANG_UPDATE_REQUEST });
    const { data } = await gioHangAPI.update(id, item);
    dispatch({
      type: gioHangConstants.GIOHANG_UPDATE_SUCCESS,
      payload: data,
    });
    toast.success("Updated Successfully");
  } catch (error) {
    dispatch({
      type: gioHangConstants.GIOHANG_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Error");
  }
};

export const deleteGioHang = (id) => async (dispatch) => {
  try {
    dispatch({ type: gioHangConstants.GIOHANG_DELETE_REQUEST });
    const { data } = await gioHangAPI.deleteItem(id);
    dispatch({
      type: gioHangConstants.GIOHANG_DELETE_SUCCESS,
      payload: data,
    });
    toast.success("Deleted Successfully");
  } catch (error) {
    dispatch({
      type: gioHangConstants.GIOHANG_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Error");
  }
};

export const fetchListChiTietGioHang = (id) => async (dispatch) => {
  try {
    dispatch({ type: gioHangConstants.GIOHANG_DETAIL_REQUEST });

    const { data } = await gioHangAPI.getDetails(id);

    dispatch({
      type: gioHangConstants.GIOHANG_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: gioHangConstants.GIOHANG_DETAIL_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const addToCart = (item, qty) => async (dispatch, getState) => {
  const ThanhTien = item.DonGiaBan * qty;

  dispatch({
    type: gioHangConstants.GIOHANG_ADD_ITEM,
    payload: {
      ...item,
      ThanhTien: ThanhTien,
      SoLuongMua: qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
  if (qty === 1) {
    toast.success("Đã thêm vào giỏ hàng");
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: gioHangConstants.GIOHANG_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
};

export const createCart = (item) => (dispatch) => {
  try {
    dispatch({ type: gioHangConstants.GIOHANG_CREATE_REQUEST });

    const { data } = gioHangAPI.createItem(item);

    dispatch({
      type: gioHangConstants.GIOHANG_CREATE_SUCCESS,
      payload: data,
    });
    toast.success("Created Successfully");
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: gioHangConstants.GIOHANG_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Created Failed");
  }
};
