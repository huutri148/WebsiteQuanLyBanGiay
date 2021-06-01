import * as nguoiDungConstant from "../constants/nguoiDungConstant";
import * as _ from "lodash";

const initalState = {
  userInfo: {},
};

export const userLoginReducer = (state = initalState, action) => {
  switch (action.type) {
    case nguoiDungConstant.NGUOIDUNG_LOGIN_REQUEST: {
      return {
        //note: add loading
        loading: true,
        userInfo: {},
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGIN_SUCCESS: {
      return {
        loading: false,
        userInfo: { ...action.payload },
      };
    }
    case nguoiDungConstant.NGUOIDUNG_LOGIN_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
