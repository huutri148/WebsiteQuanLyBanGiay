import { combineReducers } from "redux";
import * as GiayReducer from "./giayReducer";
import { listSizeReducer } from "./sizeReducer";
import * as hangSanXuatReducer from "./hangSanXuatReducer";
import * as nhaCungCapReducer from "./nhaCungCapReducer";
import * as nguoiDungReducer from "./nguoiDungReducer";
import * as phieuBanHangReducer from "./phieuBanHangReducer";
import mauReducer from "./mauReducer";
const rootReducer = combineReducers({
  //giay size mau
  ListGiay: listGiayReducer,
  ListSize: listSizeReducer,
  Giay: giayReducer,
  CreateGiay: GiayReducer.giayCreateReducer,
  SizeGiay: giaySizeReducer,
  ListMau: mauReducer,
  //hang san xuat
  ListHangSanXuat: hangSanXuatReducer.brandListReducer,
  CreateHangSanXuat: hangSanXuatReducer.brandCreateReducer,
  UpdateHangSanXuat: hangSanXuatReducer.brandUpdateReducer,
  DeleteHangSanXuat: hangSanXuatReducer.brandDeleteReducer,
  //nha cung cap
  ListNhaCungCap: nhaCungCapReducer.supplierListReducer,
  CreateNhaCungCap: nhaCungCapReducer.supplierCreateReducer,
  UpdateNhaCungCap: nhaCungCapReducer.supplierUpdateReducer,
  DeleteNhaCungCap: nhaCungCapReducer.supplierDeleteReducer,
  //phieu ban hang
  ListPhieuBanHang: phieuBanHangReducer.billListReducer,
  CreatePhieuBanHang: phieuBanHangReducer.billCreateReducer,
  UpdatePhieuBanHang: phieuBanHangReducer.billUpdateReducer,
  DeletePhieuBanHang: phieuBanHangReducer.billDeleteReducer,
  //login
  UserLogin: nguoiDungReducer.userLoginReducer,
});

export default rootReducer;
