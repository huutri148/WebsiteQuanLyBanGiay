import * as giayConstant from "../constants/giayConstant";
import * as _ from "lodash";

const initalState = {
  listGiay: {},
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case giayConstant.GIAY_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listGiay: {},
      };
    }
    case giayConstant.GIAY_LIST_SUCCESS: {
      const list = _.mapKeys(action.payload, "MaGiay");
      return {
        loading: false,
        listGiay: { ...list },
      };
    }
    case giayConstant.GIAY_LIST_FAIL: {
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
