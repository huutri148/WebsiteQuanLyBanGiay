import * as _ from "lodash";
import * as sizeConstant from "../constants/sizeContant";

const initalState = {
  listSize: {},
};

export const listSizeReducer = (state = initalState, action) => {
  switch (action.type) {
    case sizeConstant.SIZE_LIST_REQUEST: {
      return {
        loading: true,
        listSize: {},
      };
    }
    case sizeConstant.SIZE_LIST_SUCCESS: {
      const list = _.mapKeys(action.payload, "MaSize");
      return {
        loading: false,
        listSize: { ...list },
      };
    }
    case sizeConstant.SIZE_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
