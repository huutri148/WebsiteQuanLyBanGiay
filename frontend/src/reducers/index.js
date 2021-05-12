import { combineReducers } from "redux";
import giayReducer from "./Giay";
const rootReducer = combineReducers({
  Giay: giayReducer,
});

export default rootReducer;
