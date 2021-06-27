import * as baoCaoBanHangAPI from "../apis/baoCaoBanHangAPI";
import * as baoCaoBanHangConstants from "../../constants/baoCaoBanHangConstant";
import { toast } from "react-toastify";
export const fetchListBaoCaoBanHang = () => async (dispatch) => {
  try {
    dispatch({ type: baoCaoBanHangConstants.BAOCAOBANHANG_LIST_REQUEST });

    const { data } = await baoCaoBanHangAPI.getList();

    dispatch({
      type: baoCaoBanHangConstants.BAOCAOBANHANG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: baoCaoBanHangConstants.BAOCAOBANHANG_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createBaoCaoBanHang = (item) => async (dispatch) => {
  try {
    dispatch({ type: baoCaoBanHangConstants.BAOCAOBANHANG_CREATE_REQUEST });
    const { data } = await baoCaoBanHangAPI.create(item);
    dispatch({
      type: baoCaoBanHangConstants.BAOCAOBANHANG_CREATE_SUCCESS,
      payload: data,
    });
    toast.success("Successfully");
  } catch (error) {
    dispatch({
      type: baoCaoBanHangConstants.BAOCAOBANHANG_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Failed");
  }
};

export const fetchListChiTietBaoCaoBanHang = (id) => async (dispatch) => {
  try {
    dispatch({ type: baoCaoBanHangConstants.BAOCAOBANHANG_DETAIL_REQUEST });

    const { data } = await baoCaoBanHangAPI.getDetails(id);

    dispatch({
      type: baoCaoBanHangConstants.BAOCAOBANHANG_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: baoCaoBanHangConstants.BAOCAOBANHANG_DETAIL_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
