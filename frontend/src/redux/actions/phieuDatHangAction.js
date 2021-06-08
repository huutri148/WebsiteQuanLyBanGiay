import * as phieuDatHangAPI from "../apis/phieuDatHangAPI";
import * as phieuDatHangConstants from "../../constants/phieuDatHangConstant";
import { toast } from "react-toastify";
export const fetchListPhieuDatHang = () => async (dispatch) => {
  try {
    dispatch({ type: phieuDatHangConstants.PHIEUDATHANG_LIST_REQUEST });

    const { data } = await phieuDatHangAPI.getList();

    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createPhieuDatHang = (item) => async (dispatch) => {
  try {
    dispatch({ type: phieuDatHangConstants.PHIEUDATHANG_CREATE_REQUEST });
    const { data } = await phieuDatHangAPI.create(item);
    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_CREATE_SUCCESS,
      payload: data,
    });
    await toast.success("Created Successfully");
  } catch (error) {
    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Created Error");
  }
};
export const updatePhieuDatHang = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: phieuDatHangConstants.PHIEUDATHANG_UPDATE_REQUEST });
    const { data } = await phieuDatHangAPI.update(id, item);
    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_UPDATE_SUCCESS,
      payload: data,
    });
    toast.success("Updated Successfully");
  } catch (error) {
    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Error");
  }
};

export const deletePhieuDatHang = (id) => async (dispatch) => {
  try {
    dispatch({ type: phieuDatHangConstants.PHIEUDATHANG_DELETE_REQUEST });
    const { data } = await phieuDatHangAPI.deleteItem(id);
    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_DELETE_SUCCESS,
      payload: data,
    });
    toast.success("Deleted Successfully");
  } catch (error) {
    dispatch({
      type: phieuDatHangConstants.PHIEUDATHANG_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Error");
  }
};
