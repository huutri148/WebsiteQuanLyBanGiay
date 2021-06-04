import * as nhaCungCapConstant from "../../constants/nhaCungCapConstant";
import * as _ from "lodash";

const initalState = {
  listNhaCungCap: {},
};

export const supplierListReducer = (state = initalState, action) => {
  switch (action.type) {
    case nhaCungCapConstant.NHACUNGCAP_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listNhaCungCap: {},
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_LIST_SUCCESS: {
      const suppliers = _.mapKeys(action.payload, "MaNhaCungCap");
      return {
        loading: false,
        listNhaCungCap: { ...suppliers },
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const supplierCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case nhaCungCapConstant.NHACUNGCAP_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        supplier: action.payload,
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const supplierUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case nhaCungCapConstant.NHACUNGCAP_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        supplier: action.payload,
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const supplierDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case nhaCungCapConstant.NHACUNGCAP_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
        supplier: action.payload,
      };
    }
    case nhaCungCapConstant.NHACUNGCAP_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
