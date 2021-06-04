import * as mauConstant from "../../constants/mauConstant";
import * as _ from "lodash";

const initalState = {
  listMau: {},
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case mauConstant.MAU_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listMau: {},
      };
    }
    case mauConstant.MAU_LIST_SUCCESS: {
      const colors = _.mapKeys(action.payload, "MaMau");
      return {
        loading: false,
        listMau: { ...colors },
      };
    }
    case mauConstant.MAU_LIST_FAIL: {
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
