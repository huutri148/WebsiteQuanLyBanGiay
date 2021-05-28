import { combineReducers } from "redux";
import { listGiayReducer, giayReducer, giaySizeReducer } from "./giayReducer";
import { listSizeReducer } from "./sizeReducer";
import * as hangSanXuatReducer from "./hangSanXuatReducer";
import * as nhaCungCapReducer from "./nhaCungCapReducer";
import mauReducer from "./mauReducer";
const rootReducer = combineReducers({
  ListGiay: listGiayReducer,
  ListSize: listSizeReducer,
  Giay: giayReducer,
  SizeGiay: giaySizeReducer,
  ListHangSanXuat: hangSanXuatReducer.brandListReducer,
  CreateHangSanXuat: hangSanXuatReducer.brandCreateReducer,
  UpdateHangSanXuat: hangSanXuatReducer.brandUpdateReducer,
  DeleteHangSanXuat: hangSanXuatReducer.brandDeleteReducer,
  ListNhaCungCap: nhaCungCapReducer.supplierListReducer,
  CreateNhaCungCap: nhaCungCapReducer.supplierCreateReducer,
  UpdateNhaCungCap: nhaCungCapReducer.supplierUpdateReducer,
  DeleteNhaCungCap: nhaCungCapReducer.supplierDeleteReducer,
  ListMau: mauReducer,
});

export default rootReducer;
