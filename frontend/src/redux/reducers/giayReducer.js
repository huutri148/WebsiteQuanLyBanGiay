import * as giayConstant from "../../constants/giayConstant";
import * as _ from "lodash";

const initalState = {
  listGiay: {},
  giay: {},
  giaySize: {},
};

export const listGiayReducer = (state = initalState, action) => {
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
export const giayReducer = (state = initalState, action) => {
  switch (action.type) {
    case giayConstant.GIAY_REQUEST: {
      return {
        //note: add loading
        loading: true,
        giay: {},
      };
    }
    case giayConstant.GIAY_SUCCESS: {
      return {
        loading: false,
        giay: { ...action.payload },
      };
    }
    case giayConstant.GIAY_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const giaySizeReducer = (state = initalState, action) => {
  switch (action.type) {
    case giayConstant.GIAY_SIZE_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        giaySize: {},
      };
    }
    case giayConstant.GIAY_SIZE_LIST_SUCCESS: {
      const list = _.mapKeys(action.payload, "MaSize");
      return {
        loading: false,
        giaySize: { ...list },
      };
    }
    case giayConstant.GIAY_SIZE_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export const giayCreateReducer = (state = initalState, action) => {
  switch (action.type) {
    case giayConstant.GIAY_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
        giay: {},
      };
    }
    case giayConstant.GIAY_CREATE_SUCCESS: {
      return {
        loading: false,
        giay: { ...action.payload },
      };
    }
    case giayConstant.GIAY_SIZE_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
