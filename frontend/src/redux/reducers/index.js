import { combineReducers } from "redux";
import * as GiayReducer from "./giayReducer";
import { listSizeReducer } from "./sizeReducer";
import * as hangSanXuatReducer from "./hangSanXuatReducer";
import * as nhaCungCapReducer from "./nhaCungCapReducer";
import * as nguoiDungReducer from "./nguoiDungReducer";
import * as phieuBanHangReducer from "./phieuBanHangReducer";
import * as phieuNhapKhoReducer from "./phieuNhapKhoReducer";
import * as phieuDatHangReducer from "./phieuDatHangReducer";
import * as chucVuReducer from "./chucVuReducer";
import * as gioHangReducer from "./gioHangReducer";
import mauReducer from "./mauReducer";
const rootReducer = combineReducers({
  //giay size mau
  ListGiay: GiayReducer.listGiayReducer,
  ListSize: listSizeReducer,
  Giay: GiayReducer.giayReducer,
  CreateGiay: GiayReducer.giayCreateReducer,
  SizeGiay: GiayReducer.giaySizeReducer,
  SetProducts: GiayReducer.setProductsReducer,
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
  ListChiTietPhieuBanHang: phieuBanHangReducer.billDetailListReducer,
  //phieu nhap kho
  ListPhieuNhapKho: phieuNhapKhoReducer.recdocketListReducer,
  CreatePhieuNhapKho: phieuNhapKhoReducer.recdocketCreateReducer,
  UpdatePhieuNhapKho: phieuNhapKhoReducer.recdocketUpdateReducer,
  DeletePhieuNhapKho: phieuNhapKhoReducer.recdocketDeleteReducer,
  ListChiTietPhieuNhapKho: phieuNhapKhoReducer.recdocketDetailListReducer,
  //phieu dat hang
  ListPhieuDatHang: phieuDatHangReducer.orderListReducer,
  CreatePhieuDatHang: phieuDatHangReducer.orderCreateReducer,
  UpdatePhieuDatHang: phieuDatHangReducer.orderUpdateReducer,
  DeletePhieuDatHang: phieuDatHangReducer.orderDeleteReducer,
  //login
  UserLogin: nguoiDungReducer.userLoginReducer,
  ListNguoiDung: nguoiDungReducer.listNguoiDungReducer,
  ListKhachHang: nguoiDungReducer.listKhachHangReducer,
  ListNhanVien: nguoiDungReducer.listNhanVienReducer,
  User: nguoiDungReducer.setUserReducer,
  //ChucVu
  ListChucVu: chucVuReducer.listChucVuReducer,
  //Gio Hang
  ListGioHang: gioHangReducer.cartListReducer,
  UpdateGioHang: gioHangReducer.cartUpdateReducer,
  DeleteGioHang: gioHangReducer.cartDeleteReducer,
  ListChiTietGioHang: gioHangReducer.cartDetailListReducer,
  Cart: gioHangReducer.cartReducer,
  CreateGioHang: gioHangReducer.cartCreateReducer,
});

export default rootReducer;
