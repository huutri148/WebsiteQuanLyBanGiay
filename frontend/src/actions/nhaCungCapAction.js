import * as nhaCungCapAPI from "../apis/nhaCungCapAPI";
import * as nhaCungCapConstants from "../constants/nhaCungCapConstant";
export const fetchListNhaCungCap = () => async (dispatch) => {
  try {
    dispatch({ type: nhaCungCapConstants.NHACUNGCAP_LIST_REQUEST });

    const { data } = await nhaCungCapAPI.getList();

    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createNhaCungCap = (item) => async (dispatch) => {
  try {
    dispatch({ type: nhaCungCapConstants.NHACUNGCAP_CREATE_REQUEST });
    const { data } = await nhaCungCapAPI.create(item);
    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const updateNhaCungCap = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: nhaCungCapConstants.NHACUNGCAP_UPDATE_REQUEST });
    const { data } = await nhaCungCapAPI.update(id, item);
    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const deleteNhaCungCap = (id) => async (dispatch) => {
  try {
    dispatch({ type: nhaCungCapConstants.NHACUNGCAP_DELETE_REQUEST });
    const { data } = await nhaCungCapAPI.deleteItem(id);
    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nhaCungCapConstants.NHACUNGCAP_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
