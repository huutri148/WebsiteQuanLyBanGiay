import * as nguoiDungAPI from "../apis/nguoiDungAPI";
import * as nguoiDungConstants from "../constants/nguoiDungConstant";
export const fetchListNguoiDung = () => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NGUOIDUNG_LIST_REQUEST });

    const { data } = await nguoiDungAPI.getList();

    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const login = (item) => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NGUOIDUNG_LOGIN_REQUEST });

    const { data } = await nguoiDungAPI.login(item);

    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LOGIN_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
};
export const register = (item) => async (dispatch) => {
  try {
    dispatch({ type: nguoiDungConstants.NGUOIDUNG_REGISTER_REQUEST });

    const { data } = await nguoiDungAPI.register(item);

    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: nguoiDungConstants.NGUOIDUNG_REGISTER_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
