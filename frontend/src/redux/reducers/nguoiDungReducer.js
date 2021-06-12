import * as nguoiDungConstant from "../../constants/nguoiDungConstant";
import * as _ from "lodash";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initalState = {
  userInfo: {},
};
const userInitalState = {
  listNguoiDung: {},
};
export const listNguoiDungReducer = (state = userInitalState, action) => {
  switch (action.type) {
    case nguoiDungConstant.NGUOIDUNG_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listNguoiDung: {},
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LIST_SUCCESS: {
      const users = _.mapKeys(action.payload, "MaNguoiDung");
      return {
        loading: false,
        listNguoiDung: { ...users },
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export const userLoginReducer = (state = initalState, action) => {
  switch (action.type) {
    case nguoiDungConstant.NGUOIDUNG_LOGIN_REQUEST: {
      return {
        //note: add loading
        loading: true,
        isLoggedIn: false,
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGIN_SUCCESS: {
      return {
        loading: false,
        isLoggedIn: true,
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGIN_FAIL: {
      return {
        loading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export const setUserReducer = (state = initalState, action) => {
  switch (action.type) {
    case nguoiDungConstant.NGUOIDUNG_INFO_REQUEST: {
      return {
        isSet: false,
        userInfo: {},
      };
    }
    case nguoiDungConstant.NGUOIDUNG_INFO_SUCCESS: {
      return {
        isSet: true,
        userInfo: { ...action.payload },
      };
    }
    case nguoiDungConstant.NGUOIDUNG_INFO_FAIL: {
      return {
        isSet: false,
        error: action.payload,
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};
