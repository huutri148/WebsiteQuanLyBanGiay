import * as chatConstant from "../../constants/chatConstant";
import * as _ from "lodash";

const initalState = {
  room: [],
  detailRooms: {},
};
export const roomReducer = (state = initalState, action) => {
  switch (action.type) {
    case chatConstant.CHAT_DETAIL_REQUEST: {
      return {
        //note: add loading
        loading: true,
        room: [],
      };
    }
    case chatConstant.CHAT_DETAIL_SUCCESS: {
      return {
        loading: false,
        room: [...action.payload],
      };
    }
    case chatConstant.CHAT_DETAIL_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const listDetailRoomReducer = (state = initalState, action) => {
  switch (action.type) {
    case chatConstant.CHAT_DETAIL_REQUEST: {
      return {
        //note: add loading
        loading: true,
        detailRooms: [],
      };
    }
    case chatConstant.CHAT_DETAIL_SUCCESS: {
      const list = _.mapKeys(action.payload, "MaPhong");
      return {
        loading: false,
        detailRooms: { ...list },
      };
    }
    case chatConstant.CHAT_DETAIL_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
