import * as sizeAPI from "../apis/sizeAPI";
import * as sizeConstants from "../constants/sizeContant";
export const fetchListSize = () => async (dispatch) => {
  try {
    dispatch({ type: sizeConstants.SIZE_LIST_REQUEST });

    const { data } = await sizeAPI.getList();

    dispatch({
      type: sizeConstants.SIZE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: sizeConstants.SIZE_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
