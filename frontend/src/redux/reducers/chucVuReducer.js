import * as chucVuConstant from "../../constants/chucVuConstant";
import * as _ from "lodash";

const initalState = {
  listChucVu: {},
};
export const dutyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case chucVuConstant.CHUCVU_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        duty: action.payload,
      };
    }
    case chucVuConstant.CHUCVU_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const dutyUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case chucVuConstant.CHUCVU_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        duty: action.payload,
      };
    }
    case chucVuConstant.CHUCVU_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const dutyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case chucVuConstant.CHUCVU_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
        duty: action.payload,
      };
    }
    case chucVuConstant.CHUCVU_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
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

export const listDutyPermissionsReducer = (
  state = { listPhanQuyen: [] },
  action
) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_PERMISSIONS_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listPhanQuyen: [],
      };
    }
    case chucVuConstant.CHUCVU_PERMISSIONS_SUCCESS: {
      const records = action.payload.data.reduce((result, value) => {
        result.push(value.MaQuyen);
        return result;
      }, []);
      if (records.length > 0) {
        records.push(10);
      }

      return {
        loading: false,
        listPhanQuyen: [...records],
      };
    }
    case chucVuConstant.DELETE_CHUCVU_PERMISSIONS: {
      return {
        loading: false,
        listPhanQuyen: [],
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

export const listPermissionsReducer = (state = { listQuyen: {} }, action) => {
  switch (action.type) {
    case chucVuConstant.CHUCVU_ALL_PERMISSIONS_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listQuyen: {},
      };
    }
    case chucVuConstant.CHUCVU_ALL_PERMISSIONS_SUCCESS: {
      const records = _.mapKeys(action.payload, "MaQuyen");
      return {
        loading: false,
        listQuyen: { ...records },
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

export const addDutyPermissionsReducer = (state = {}, action) => {
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
