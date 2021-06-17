import quanLySanPhamRoute from "./QuanLySanPham/QuanLySanPhamRoute";
import quanLyBanHangRoute from "./QuanLyBanHang/QuanLyBanHangRoute";
import quanLyNhapKhoRoute from "./QuanLyNhapKho/QuanLyNhapKhoRoute";
import quanLyPhieuDatHangRoute from "./QuanLyPhieuDatHang/QuanLyPhieuDatHangRoute";
import quanLyNhaCungCapRoute from "./QuanLyNhaCungCap/QuanLyNhaCungCapRoute";
import quanLyHangSanXuatRoute from "./QuanLyHangSanXuat/QuanLyHangSanXuatRoute";
import loginRoute from "./Login/LoginRoute";
import sessionRoute from "./session/sessionRoute";
import dashboarRoute from "./Dashboard/DashboardRoute";
import quanLyNguoiDungRoute from "./QuanLyNguoiDung/QuanLyNguoiDungRoute";
import quanLyGioHangRoute from "./QuanLyGioHang/QuanLyGioHangRoute";
const routes = [
  ...quanLySanPhamRoute,
  ...loginRoute,
  ...quanLyBanHangRoute,
  ...quanLyNhapKhoRoute,
  ...quanLyPhieuDatHangRoute,
  ...quanLyNhaCungCapRoute,
  ...quanLyHangSanXuatRoute,
  ...quanLyNguoiDungRoute,
  ...dashboarRoute,
  ...sessionRoute,
  ...quanLyGioHangRoute,
];

export default routes;
