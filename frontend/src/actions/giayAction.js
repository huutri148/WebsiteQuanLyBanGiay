import * as giayAPI from "../apis/giayAPI";
import * as giayConstants from "../constants/giayConstant";
export const fetchListGiay = () => async (dispatch) => {
  // return (dispatch) => {
  //   giayAPI
  //     .getList()
  //     .then((data) => {
  //       console.log("Data: ", data);
  //     })
  //     .catch((error) => {
  //       console.log("Error: ", error);
  //     });
  // };
  try {
    dispatch({ type: giayConstants.FETCH_LIST_GIAY });

    const { data } = await giayAPI.getList();

    dispatch({
      type: giayConstants.FETCH_LIST_GIAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: giayConstants.FETCH_LIST_GIAY_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
