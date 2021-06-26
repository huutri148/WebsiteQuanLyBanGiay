import * as chatAPI from "../apis/chatAPI";
import * as chatConstants from "../../constants/chatConstant";
export const fetchListRoomChat = () => async (dispatch) => {
  try {
    dispatch({ type: chatConstants.CHAT_LIST_REQUEST });

    const { data } = await chatAPI.getList();

    dispatch({
      type: chatConstants.CHAT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chatConstants.CHAT_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const fetchRoomChat = (id) => async (dispatch) => {
  try {
    dispatch({ type: chatConstants.CHAT_DETAIL_REQUEST });

    const { data } = await chatAPI.getRoomByID(id);

    dispatch({
      type: chatConstants.CHAT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chatConstants.CHAT_DETAIL_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const fetchListDetailRoom = () => async (dispatch) => {
  try {
    dispatch({ type: chatConstants.CHAT_DETAIL_LIST_REQUEST });

    const { data } = await chatAPI.getListDetailRoom();

    dispatch({
      type: chatConstants.CHAT_DETAIL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: chatConstants.CHAT_DETAIL_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
