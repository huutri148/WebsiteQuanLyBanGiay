import * as gioHangConstant from "../../constants/gioHangConstant";
import * as _ from "lodash";

const initalState = {
  listGioHang: {},
  listChiTietGioHang: {},
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

export const cartDetailListReducer = (state = initalState, action) => {
  switch (action.type) {
    case gioHangConstant.GIOHANG_DETAIL_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listChiTietGioHang: {},
      };
    }
    case gioHangConstant.GIOHANG_DETAIL_SUCCESS: {
      const details = action.payload;
      return {
        loading: false,
        listChiTietGioHang: { ...details },
      };
    }
    case gioHangConstant.GIOHANG_DETAIL_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case gioHangConstant.GIOHANG_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.MaChiTietGiay === item.MaChiTietGiay
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.MaChiTietGiay === existItem.MaChiTietGiay ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          TongTien: state.TongTien + item.ThanhTien,
        };
      }
    case gioHangConstant.GIOHANG_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.MaChiTietGiay !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const cartCreateReducer = (state = initalState, action) => {
  switch (action.type) {
    case gioHangConstant.GIOHANG_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case gioHangConstant.GIOHANG_CREATE_SUCCESS: {
      return {
        loading: false,
      };
    }
    case gioHangConstant.GIOHANG_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
