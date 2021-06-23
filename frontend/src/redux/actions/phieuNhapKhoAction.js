import * as phieuNhapKhoAPI from "../apis/phieuNhapKhoAPI";
import * as phieuNhapKhoConstants from "../../constants/phieuNhapKhoConstant";
export const fetchListPhieuNhapKho = () => async (dispatch) => {
  try {
    dispatch({ type: phieuNhapKhoConstants.PHIEUNHAPKHO_LIST_REQUEST });

    const { data } = await phieuNhapKhoAPI.getList();

    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createPhieuNhapKho = (item) => async (dispatch) => {
  try {
    dispatch({ type: phieuNhapKhoConstants.PHIEUNHAPKHO_CREATE_REQUEST });
    const { data } = await phieuNhapKhoAPI.create(item);
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const updatePhieuNhapKho = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: phieuNhapKhoConstants.PHIEUNHAPKHO_UPDATE_REQUEST });
    const { data } = await phieuNhapKhoAPI.update(id, item);
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const deletePhieuNhapKho = (id) => async (dispatch) => {
  try {
    dispatch({ type: phieuNhapKhoConstants.PHIEUNHAPKHO_DELETE_REQUEST });
    const { data } = await phieuNhapKhoAPI.deleteItem(id);
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const fetchListChiTietPhieuNhapKho = (id) => async (dispatch) => {
  try {
    dispatch({ type: phieuNhapKhoConstants.PHIEUNHAPKHO_DETAIL_REQUEST });

    const { data } = await phieuNhapKhoAPI.getDetails(id);

    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuNhapKhoConstants.PHIEUNHAPKHO_DETAIL_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
