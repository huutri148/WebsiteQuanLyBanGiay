import { combineReducers } from "redux";
import { listGiayReducer, giayReducer, giaySizeReducer } from "./giayReducer";
import { listSizeReducer } from "./sizeReducer";
import {
  brandListReducer,
  brandCreateReducer,
  brandUpdateReducer,
  brandDeleteReducer,
} from "./hangSanXuatReducer";
import mauReducer from "./mauReducer";
const rootReducer = combineReducers({
  ListGiay: listGiayReducer,
  ListSize: listSizeReducer,
  Giay: giayReducer,
  SizeGiay: giaySizeReducer,
  ListHangSanXuat: brandListReducer,
  CreateHangSanXuat: brandCreateReducer,
  UpdateHangSanXuat: brandUpdateReducer,
  DeleteHangSanXuat: brandDeleteReducer,
  ListMau: mauReducer,
});

export default rootReducer;
