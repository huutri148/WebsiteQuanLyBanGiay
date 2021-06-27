import * as chucVuAPI from "../apis/chucVuAPI";
import * as chucVuConstants from "../../constants/chucVuConstant";
import { toast } from "react-toastify";
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
export const createChucVu = (item) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_CREATE_REQUEST });
    const { data } = await chucVuAPI.create(item);
    dispatch({
      type: chucVuConstants.CHUCVU_CREATE_SUCCESS,
      payload: data,
    });
    toast.success("Successfully");
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Failed");
  }
};
export const updateChucVu = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_UPDATE_REQUEST });
    const { data } = await chucVuAPI.update(id, item);
    dispatch({
      type: chucVuConstants.CHUCVU_UPDATE_SUCCESS,
      payload: data,
    });
    toast.success("Successfully");
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Failed");
  }
};
export const deleteChucVu = (id) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_DELETE_REQUEST });
    const { data } = await chucVuAPI.deleteItem(id);
    dispatch({
      type: chucVuConstants.CHUCVU_DELETE_SUCCESS,
      payload: data,
    });
    toast.success("Successfully");
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Failed");
  }
};
export const fetchListQuyen = (id) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_REQUEST });

    const { data } = await chucVuAPI.getDutyPermissions(id);

    dispatch({
      type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const fetchListPhanQuyen = (id) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_PERMISSIONS_REQUEST });

    const { data } = await chucVuAPI.getDutyPermissions(id);

    dispatch({
      type: chucVuConstants.CHUCVU_PERMISSIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_PERMISSIONS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const addPermissions = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: chucVuConstants.CHUCVU_ADD_PERMISSIONS_REQUEST });
    const { data } = await chucVuAPI.addPermissions(id, item);
    dispatch({
      type: chucVuConstants.CHUCVU_ADD_PERMISSIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chucVuConstants.CHUCVU_ALL_PERMISSIONS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
