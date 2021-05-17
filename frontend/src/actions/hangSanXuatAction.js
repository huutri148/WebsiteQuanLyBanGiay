import * as hangSanXuatAPI from "../apis/hangSanXuatAPI";
import * as hangSanXuatConstants from "../constants/hangSanXuatConstant";
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
