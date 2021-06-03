import { combineReducers } from "redux";
import * as GiayReducer from "./giayReducer";
import { listSizeReducer } from "./sizeReducer";
import * as hangSanXuatReducer from "./hangSanXuatReducer";
import * as nhaCungCapReducer from "./nhaCungCapReducer";
import * as nguoiDungReducer from "./nguoiDungReducer";
import mauReducer from "./mauReducer";
const rootReducer = combineReducers({
  ListGiay: GiayReducer.listGiayReducer,
  ListSize: listSizeReducer,
  Giay: GiayReducer.giayReducer,
  CreateGiay: GiayReducer.giayCreateReducer,
  SizeGiay: GiayReducer.giaySizeReducer,
  ListHangSanXuat: hangSanXuatReducer.brandListReducer,
  CreateHangSanXuat: hangSanXuatReducer.brandCreateReducer,
  UpdateHangSanXuat: hangSanXuatReducer.brandUpdateReducer,
  DeleteHangSanXuat: hangSanXuatReducer.brandDeleteReducer,
  ListNhaCungCap: nhaCungCapReducer.supplierListReducer,
  CreateNhaCungCap: nhaCungCapReducer.supplierCreateReducer,
  UpdateNhaCungCap: nhaCungCapReducer.supplierUpdateReducer,
  DeleteNhaCungCap: nhaCungCapReducer.supplierDeleteReducer,
  ListMau: mauReducer,
  UserLogin: nguoiDungReducer.userLoginReducer,
});

export default rootReducer;
