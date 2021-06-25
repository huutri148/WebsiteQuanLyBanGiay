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

export const listDutyPermissionsReducer = (state = {listDutyPermssions:{}}, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_PERMISSIONS_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listDutyPermssions: {},
      };
    }
    case chucVuConstant.CHUCVU_PERMISSIONS_SUCCESS: {
      const records = _.mapKeys(action.payload, "MaQuyen");
      return {
        loading: false,
        listDutyPermssions: { ...records },
      };
    }
    case chucVuConstant.CHUCVU_PERMISSIONS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const listPermissionsReducer = (state = {listPermssions:{}}, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_ALL_PERMISSIONS_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listPermssions: {},
      };
    }
    case chucVuConstant.CHUCVU_ALL_PERMISSIONS_SUCCESS: {
      const records = _.mapKeys(action.payload, "MaQuyen");
      return {
        loading: false,
        listPermssions: { ...records },
      };
    }
    case chucVuConstant.CHUCVU_ALL_PERMISSIONS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const addDutyPermissionsReducer = (state = {listPermssions:{}}, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_ADD_PERMISSIONS_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case chucVuConstant.CHUCVU_ADD_PERMISSIONS_SUCCESS: {
      return {
        loading: false,
        success: true,
      };
    }
    case chucVuConstant.CHUCVU_ALL_PERMISSIONS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};