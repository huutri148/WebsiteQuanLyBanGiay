import * as phieuChiConstant from "../../constants/phieuChiConstant";
import * as _ from "lodash";

const initalState = {
  listPhieuChi: {},
};

export const paymentvoucherListReducer = (state = initalState, action) => {
  switch (action.type) {
    case phieuChiConstant.PHIEUCHI_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listPhieuChi: {},
      };
    }
    case phieuChiConstant.PHIEUCHI_LIST_SUCCESS: {
      const paymentvouchers = _.mapKeys(action.payload, "SoPhieuChi");
      return {
        loading: false,
        listPhieuChi: { ...paymentvouchers },
      };
    }
    case phieuChiConstant.PHIEUCHI_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const paymentvoucherCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuChiConstant.PHIEUCHI_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuChiConstant.PHIEUCHI_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        paymentvoucher: action.payload,
      };
    }
    case phieuChiConstant.PHIEUCHI_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};