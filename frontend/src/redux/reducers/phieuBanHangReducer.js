import * as phieuBanHangConstant from "../../constants/phieuBanHangConstant";
import * as _ from "lodash";

const initalState = {
  listPhieuBanHang: {},
};
const initalDetailState = {
  listChiTietPhieuBanHang: {},
};

export const billListReducer = (state = initalState, action) => {
  switch (action.type) {
    case phieuBanHangConstant.PHIEUBANHANG_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listPhieuBanHang: {},
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_LIST_SUCCESS: {
      const bills = _.mapKeys(action.payload, "SoPhieuBanHang");
      return {
        loading: false,
        listPhieuBanHang: { ...bills },
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const billCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuBanHangConstant.PHIEUBANHANG_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        bill: action.payload,
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const billUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuBanHangConstant.PHIEUBANHANG_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        bill: action.payload,
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const billDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuBanHangConstant.PHIEUBANHANG_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
        bill: action.payload,
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export const billDetailListReducer = (state = initalDetailState, action) => {
  switch (action.type) {
    case phieuBanHangConstant.PHIEUBANHANG_DETAIL_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listChiTietPhieuBanHang: {},
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_DETAIL_SUCCESS: {
      const details = action.payload;
      return {
        loading: false,
        listChiTietPhieuBanHang: { ...details },
      };
    }
    case phieuBanHangConstant.PHIEUBANHANG_DETAIL_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};