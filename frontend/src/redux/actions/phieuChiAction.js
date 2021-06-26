import * as phieuChiAPI from "../apis/phieuChiAPI";
import * as phieuChiConstants from "../../constants/phieuChiConstant";
export const fetchListPhieuChi = () => async (dispatch) => {
  try {
    dispatch({ type: phieuChiConstants.PHIEUCHI_LIST_REQUEST });

    const { data } = await phieuChiAPI.getList();

    dispatch({
      type: phieuChiConstants.PHIEUCHI_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuChiConstants.PHIEUCHI_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createPhieuChi = (item) => async (dispatch) => {
  try {
    dispatch({ type: phieuChiConstants.PHIEUCHI_CREATE_REQUEST });
    const { data } = await phieuChiAPI.create(item);
    dispatch({
      type: phieuChiConstants.PHIEUCHI_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuChiConstants.PHIEUCHI_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};