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
