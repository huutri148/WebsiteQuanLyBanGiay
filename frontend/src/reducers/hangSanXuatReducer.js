import * as hangSanXuatConstant from "../constants/hangSanXuatConstant";
import * as _ from "lodash";

const initalState = {
  listHangSanXuat: {},
};

const reducer = (state = initalState, action) => {
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
export default reducer;
