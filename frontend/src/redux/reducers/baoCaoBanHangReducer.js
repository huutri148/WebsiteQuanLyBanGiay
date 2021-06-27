import * as baoCaoBanHangConstant from "../../constants/baoCaoBanHangConstant";
import * as _ from "lodash";

const initalState = {
  listBaoCaoBanHang: {},
};
const initalDetailState = {
  listChiTietBaoCaoBanHang: {},
};

export const reportListReducer = (state = initalState, action) => {
  switch (action.type) {
    case baoCaoBanHangConstant.BAOCAOBANHANG_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listBaoCaoBanHang: {},
      };
    }
    case baoCaoBanHangConstant.BAOCAOBANHANG_LIST_SUCCESS: {
      const reports = _.mapKeys(action.payload, "MaBaoCaoBanHang");
      return {
        loading: false,
        listBaoCaoBanHang: { ...reports },
      };
    }
    case baoCaoBanHangConstant.BAOCAOBANHANG_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const reportCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case baoCaoBanHangConstant.BAOCAOBANHANG_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case baoCaoBanHangConstant.BAOCAOBANHANG_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        report: action.payload,
      };
    }
    case baoCaoBanHangConstant.BAOCAOBANHANG_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const reportDetailListReducer = (state = initalDetailState, action) => {
  switch (action.type) {
    case baoCaoBanHangConstant.BAOCAOBANHANG_DETAIL_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listChiTietBaoCaoBanHang: {},
      };
    }
    case baoCaoBanHangConstant.BAOCAOBANHANG_DETAIL_SUCCESS: {
      const details = action.payload;
      return {
        loading: false,
        listChiTietBaoCaoBanHang: { ...details },
      };
    }
    case baoCaoBanHangConstant.BAOCAOBANHANG_DETAIL_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};