import * as nguoiDungAPI from "../apis/nguoiDungAPI";
import * as nguoiDungConstants from "../../constants/nguoiDungConstant";
import localStorageService from "../../services/localStorageService";
import * as chucVuAPI from "../apis/chucVuAPI";
import * as chucVuConstants from "../../constants/chucVuConstant";
export const fetchListNguoiDung = () => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NGUOIDUNG_LIST_REQUEST });

    const { data } = await nguoiDungAPI.getList();

    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const login = (item) => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NGUOIDUNG_LOGIN_REQUEST });

    const { data } = await nguoiDungAPI.login(item);

    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LOGIN_SUCCESS,
      payload: data,
    });
    //localStorage.setItem("userInfo", JSON.stringify(data));
    localStorageService.setItem("access_token", data.accessToken);
    localStorageService.setItem("refresh_token", data.refreshToken);
    dispatch(setUser(data.userInfo));
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LOGIN_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorageService.removeItem("access_token");
    //dispatch({ type: chucVuConstants.DELETE_CHUCVU_PERMISSIONS });
  } catch (error) {}
};
export const register = (item) => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NGUOIDUNG_REGISTER_REQUEST });

    const { data } = await nguoiDungAPI.register(item);

    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_REGISTER_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const setUser = (item) => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NGUOIDUNG_INFO_REQUEST });
    dispatch({ type: chucVuConstants.CHUCVU_PERMISSIONS_REQUEST });

    const data = await chucVuAPI.getDutyPermissions(item.MaChucVu);

    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_INFO_SUCCESS,
      payload: item,
    });

    dispatch({
      type: chucVuConstants.CHUCVU_PERMISSIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_INFO_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    dispatch({
      type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const fetchListKhachHang = () => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.KHACHHANG_LIST_REQUEST });

    const { data } = await nguoiDungAPI.getListKhachHang();

    dispatch({
      type: nguoiDungConstants.KHACHHANG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.KHACHHANG_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const fetchListNhanVien = () => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NHANVIEN_LIST_REQUEST });

    const { data } = await nguoiDungAPI.getListNhanVien();

    dispatch({
      type: nguoiDungConstants.NHANVIEN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NHANVIEN_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
