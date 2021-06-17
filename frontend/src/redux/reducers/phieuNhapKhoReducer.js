import * as phieuNhapKhoConstant from "../../constants/phieuNhapKhoConstant";
import * as _ from "lodash";

const initalState = {
  listPhieuNhapKho: {},
};
const initalDetailState = {
  listChiTietPhieuNhapKho: {},
};

export const recdocketListReducer = (state = initalState, action) => {
  switch (action.type) {
    case phieuNhapKhoConstant.PHIEUNHAPKHO_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listPhieuNhapKho: {},
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_LIST_SUCCESS: {
      const recdockets = _.mapKeys(action.payload, "SoPhieuNhapKho");
      return {
        loading: false,
        listPhieuNhapKho: { ...recdockets },
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const recdocketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuNhapKhoConstant.PHIEUNHAPKHO_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        recdocket: action.payload,
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const recdocketUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuNhapKhoConstant.PHIEUNHAPKHO_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        recdocket: action.payload,
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const recdocketDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case phieuNhapKhoConstant.PHIEUNHAPKHO_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
        recdocket: action.payload,
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export const recdocketDetailListReducer = (state = initalDetailState, action) => {
  switch (action.type) {
    case phieuNhapKhoConstant.PHIEUNHAPKHO_DETAIL_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listChiTietPhieuNhapKho: {},
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_DETAIL_SUCCESS: {
      const details = action.payload;
      return {
        loading: false,
        listChiTietPhieuNhapKho: { ...details },
      };
    }
    case phieuNhapKhoConstant.PHIEUNHAPKHO_DETAIL_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};