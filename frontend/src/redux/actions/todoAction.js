import * as todoAPI from "../apis/todoAPI";
import * as todoConstants from "../../constants/todoConstant";
import { toast } from "react-toastify";
export const fetchListTodo = () => async (dispatch) => {
  try {
    dispatch({ type: todoConstants.TODO_LIST_REQUEST });

    const { data } = await todoAPI.getList();

    dispatch({
      type: todoConstants.TODO_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: todoConstants.TODO_LIST_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const createTodo = (item) => async (dispatch) => {
  try {
    dispatch({ type: todoConstants.TODO_CREATE_REQUEST });
    const { data } = await todoAPI.create(item);
    dispatch({
      type: todoConstants.TODO_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: todoConstants.TODO_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};
export const updateTodo = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: todoConstants.TODO_UPDATE_REQUEST });
    const { data } = await todoAPI.update(id, item);
    dispatch({
      type: todoConstants.TODO_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: todoConstants.TODO_UPDATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({ type: todoConstants.TODO_DELETE_REQUEST });
    const { data } = await todoAPI.deleteItem(id);
    dispatch({
      type: todoConstants.TODO_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: todoConstants.TODO_DELETE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.data.data.message
          : error.messagge,
    });
    toast.error("Error");
  }
};
