import * as giayAPI from "../apis/giayAPI";
import * as giayConstants from "../constants/giayConstant";
export const fetchListGiay = () => async (dispatch) => {
  try {
    dispatch({ type: giayConstants.GIAY_LIST_REQUEST });

    const { data } = await giayAPI.getList();

    dispatch({
      type: giayConstants.GIAY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: giayConstants.GIAY_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
