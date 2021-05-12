import * as giayConstant from "../constants/giayConstant";

const initalState = {
  listGiay: [],
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case giayConstant.FETCH_LIST_GIAY: {
      return {
        //note: add loading
        ...state,
        listGiay: [],
      };
    }
    case giayConstant.FETCH_LIST_GIAY_SUCCESS: {
      return {
        ...state,
        listGiay: action.payload,
      };
    }
    case giayConstant.FETCH_LIST_GIAY_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
