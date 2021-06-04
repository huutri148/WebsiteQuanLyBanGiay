import * as hangSanXuatAPI from "../apis/hangSanXuatAPI";
import * as hangSanXuatConstants from "../../constants/hangSanXuatConstant";
export const fetchListHangSanXuat = () => async (dispatch) => {
  try {
    dispatch({ type: hangSanXuatConstants.HANGSANXUAT_LIST_REQUEST });

    const { data } = await hangSanXuatAPI.getList();

    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createHangSanXuat = (item) => async (dispatch) => {
  try {
    dispatch({ type: hangSanXuatConstants.HANGSANXUAT_CREATE_REQUEST });
    const { data } = await hangSanXuatAPI.create(item);
    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const updateHangSanXuat = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: hangSanXuatConstants.HANGSANXUAT_UPDATE_REQUEST });
    const { data } = await hangSanXuatAPI.update(id, item);
    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const deleteHangSanXuat = (id) => async (dispatch) => {
  try {
    dispatch({ type: hangSanXuatConstants.HANGSANXUAT_DELETE_REQUEST });
    const { data } = await hangSanXuatAPI.deleteItem(id);
    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: hangSanXuatConstants.HANGSANXUAT_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
