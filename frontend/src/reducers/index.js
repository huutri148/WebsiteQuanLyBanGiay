import { combineReducers } from "redux";
import { listGiayReducer, giayReducer, giaySizeReducer } from "./giayReducer";
import { listSizeReducer } from "./sizeReducer";
import hangSanXuatReducer from "./hangSanXuatReducer";
import mauReducer from "./mauReducer";
const rootReducer = combineReducers({
  ListGiay: listGiayReducer,
  ListSize: listSizeReducer,
  Giay: giayReducer,
  SizeGiay: giaySizeReducer,
  HangSanXuat: hangSanXuatReducer,
  ListMau: mauReducer,
});

export default rootReducer;
