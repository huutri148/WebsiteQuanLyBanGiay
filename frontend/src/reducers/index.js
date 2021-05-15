import { combineReducers } from "redux";
import giayReducer from "./giayReducer";
import hangSanXuatReducer from "./hangSanXuatReducer";
const rootReducer = combineReducers({
  Giay: giayReducer,
  HangSanXuat: hangSanXuatReducer,
});

export default rootReducer;
