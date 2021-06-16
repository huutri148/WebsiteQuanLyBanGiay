import * as gioHangConstant from "../../constants/gioHangConstant";
import * as _ from "lodash";

const initalState = {
  listGioHang: {},
};

export const cartListReducer = (state = initalState, action) => {
  switch (action.type) {
    case gioHangConstant.GIOHANG_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listGioHang: {},
      };
    }
    case gioHangConstant.GIOHANG_LIST_SUCCESS: {
      const carts = _.mapKeys(action.payload, "MaGioHang");
      return {
        loading: false,
        listGioHang: { ...carts },
      };
    }
    case gioHangConstant.GIOHANG_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const cartUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case gioHangConstant.GIOHANG_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case gioHangConstant.GIOHANG_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
      };
    }
    case gioHangConstant.GIOHANG_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const cartDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case gioHangConstant.GIOHANG_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case gioHangConstant.GIOHANG_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
      };
    }
    case gioHangConstant.GIOHANG_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
