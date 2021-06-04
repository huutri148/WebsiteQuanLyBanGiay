import * as nguoiDungConstant from "../../constants/nguoiDungConstant";
import * as _ from "lodash";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initalState = userInfo
  ? {
      userInfo,
      isLoggedIn: true,
    }
  : { isLoggedIn: false, userInfo: null };

export const userLoginReducer = (state = initalState, action) => {
  switch (action.type) {
    case nguoiDungConstant.NGUOIDUNG_LOGIN_REQUEST: {
      return {
        //note: add loading
        loading: true,
        isLoggedIn: false,
        userInfo: {},
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGIN_SUCCESS: {
      return {
        loading: false,
        isLoggedIn: true,
        userInfo: { ...action.payload },
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGIN_FAIL: {
      return {
        loading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};
