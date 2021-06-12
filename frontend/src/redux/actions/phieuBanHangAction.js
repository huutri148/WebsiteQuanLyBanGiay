import * as phieuBanHangAPI from "../apis/phieuBanHangAPI";
import * as phieuBanHangConstants from "../../constants/phieuBanHangConstant";
export const fetchListPhieuBanHang = () => async (dispatch) => {
  try {
    dispatch({ type: phieuBanHangConstants.PHIEUBANHANG_LIST_REQUEST });

    const { data } = await phieuBanHangAPI.getList();

    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createPhieuBanHang = (item) => async (dispatch) => {
  try {
    dispatch({ type: phieuBanHangConstants.PHIEUBANHANG_CREATE_REQUEST });
    const { data } = await phieuBanHangAPI.create(item);
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const updatePhieuBanHang = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: phieuBanHangConstants.PHIEUBANHANG_UPDATE_REQUEST });
    const { data } = await phieuBanHangAPI.update(id, item);
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const deletePhieuBanHang = (id) => async (dispatch) => {
  try {
    dispatch({ type: phieuBanHangConstants.PHIEUBANHANG_DELETE_REQUEST });
    const { data } = await phieuBanHangAPI.deleteItem(id);
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const fetchListChiTietPhieuBanHang = (id) => async (dispatch) => {
  try {
    dispatch({ type: phieuBanHangConstants.PHIEUBANHANG_DETAIL_REQUEST });

    const { data } = await phieuBanHangAPI.getDetails(id);

    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuBanHangConstants.PHIEUBANHANG_DETAIL_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
