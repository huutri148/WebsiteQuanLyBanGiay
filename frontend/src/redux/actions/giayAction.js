import * as giayAPI from "../apis/giayAPI";
import * as giayConstants from "../../constants/giayConstant";
import { toast } from "react-toastify";
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

export const fetchGiaySize = (id) => async (dispatch) => {
  try {
    dispatch({ type: giayConstants.GIAY_SIZE_LIST_REQUEST });

    const { data } = await giayAPI.getSizeGiay(id);

    dispatch({
      type: giayConstants.GIAY_SIZE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: giayConstants.GIAY_SIZE_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const createGiay = (item) => (dispatch) => {
  try {
    dispatch({ type: giayConstants.GIAY_CREATE_REQUEST });

    const { data } = giayAPI.createGiay(item);

    dispatch({
      type: giayConstants.GIAY_CREATE_SUCCESS,
      payload: data,
    });
    toast.success("Created Successfully");
  } catch (error) {
    dispatch({
      type: giayConstants.GIAY_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Created Failed");
  }
};
export const setProducts = (item) => (dispatch) => {
  try {
    dispatch({ type: giayConstants.SET_PRODUCTS_REQUEST });

    dispatch({
      type: giayConstants.SET_PRODUCTS_SUCCESS,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: giayConstants.SET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
