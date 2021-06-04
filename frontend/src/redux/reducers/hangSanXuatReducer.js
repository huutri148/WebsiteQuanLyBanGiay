import * as hangSanXuatConstant from "../../constants/hangSanXuatConstant";
import * as _ from "lodash";

const initalState = {
  listHangSanXuat: {},
};

export const brandListReducer = (state = initalState, action) => {
  switch (action.type) {
    case hangSanXuatConstant.HANGSANXUAT_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listHangSanXuat: {},
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_LIST_SUCCESS: {
      const brands = _.mapKeys(action.payload, "MaHangSanXuat");
      return {
        loading: false,
        listHangSanXuat: { ...brands },
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const brandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case hangSanXuatConstant.HANGSANXUAT_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        brand: action.payload,
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const brandUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case hangSanXuatConstant.HANGSANXUAT_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        brand: action.payload,
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case hangSanXuatConstant.HANGSANXUAT_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
        brand: action.payload,
      };
    }
    case hangSanXuatConstant.HANGSANXUAT_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
