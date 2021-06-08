import * as phieuDatHangConstant from "../../constants/phieuDatHangConstant";
import * as _ from "lodash";

const initalState = {
  listPhieuDatHang: {},
};

export const orderListReducer = (state = initalState, action) => {
  switch (action.type) {
    case phieuDatHangConstant.PHIEUDATHANG_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listPhieuDatHang: {},
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_LIST_SUCCESS: {
      const orders = _.mapKeys(action.payload, "SoPhieuDatHang");
      return {
        loading: false,
        listPhieuDatHang: { ...orders },
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuDatHangConstant.PHIEUDATHANG_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuDatHangConstant.PHIEUDATHANG_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuDatHangConstant.PHIEUDATHANG_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    }
    case phieuDatHangConstant.PHIEUDATHANG_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
