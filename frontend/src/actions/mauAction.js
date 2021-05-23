import * as mauAPI from "../apis/mauAPI";
import * as mauConstants from "../constants/mauConstant";
export const fetchListMau = () => async (dispatch) => {
  try {
    dispatch({ type: mauConstants.MAU_LIST_REQUEST });

    const { data } = await mauAPI.getList();

    dispatch({
      type: mauConstants.MAU_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: mauConstants.MAU_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
