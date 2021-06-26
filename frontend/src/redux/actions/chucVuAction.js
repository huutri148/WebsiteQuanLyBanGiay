import * as chucVuAPI from "../apis/chucVuAPI";
import * as chucVuConstants from "../../constants/chucVuConstant";
export const fetchListChucVu = () => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_LIST_REQUEST });

    const { data } = await chucVuAPI.getList();

    dispatch({
      type: chucVuConstants.CHUCVU_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const fetchListQuyen = () => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_REQUEST });

    const { data } = await chucVuAPI.getPermissions();

    dispatch({
      type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const fetchListPhanQuyen = (id) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_PERMISSIONS_REQUEST });

    const { data } = await chucVuAPI.getDutyPermissions(id);

    dispatch({
      type: chucVuConstants.CHUCVU_PERMISSIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_PERMISSIONS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const addPermissions = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_ADD_PERMISSIONS_REQUEST });
    const { data } = await chucVuAPI.addPermissions(id, item);
    dispatch({
      type: chucVuConstants.CHUCVU_ADD_PERMISSIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
