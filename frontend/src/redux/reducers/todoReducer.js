import * as todoConstant from "../../constants/todoConstant";
import * as _ from "lodash";

const initalState = {
  listTodo: {},
};

export const todoListReducer = (state = initalState, action) => {
  switch (action.type) {
    case todoConstant.TODO_LIST_REQUEST: {
      return {
        //note: add loading
        loading: true,
        listNhaCungCap: {},
      };
    }
    case todoConstant.TODO_LIST_SUCCESS: {
      const todos = _.mapKeys(action.payload, "MaTODO");
      return {
        loading: false,
        listTodo: { ...todos },
      };
    }
    case todoConstant.TODO_LIST_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const todoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case todoConstant.TODO_CREATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case todoConstant.TODO_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
      };
    }
    case todoConstant.TODO_CREATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const todoUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case todoConstant.TODO_UPDATE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case todoConstant.TODO_UPDATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        supplier: action.payload,
      };
    }
    case todoConstant.TODO_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const todoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case todoConstant.TODO_DELETE_REQUEST: {
      return {
        //note: add loading
        loading: true,
      };
    }
    case todoConstant.TODO_DELETE_SUCCESS: {
      return {
        loading: false,
        success: true,
        supplier: action.payload,
      };
    }
    case todoConstant.TODO_DELETE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
