import * as chucVuConstant from "../../constants/chucVuConstant";
import * as _ from "lodash";

const initalState = {
  listChucVu: {},
};

export const listChucVuReducer = (state = initalState, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listChucVu: {},
      };
    }
    case chucVuConstant.CHUCVU_LIST_SUCCESS: {
      const duties = _.mapKeys(action.payload, "MaChucVu");
      return {
        loading: false,
        listChucVu: { ...duties },
      };
    }
    case chucVuConstant.CHUCVU_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
