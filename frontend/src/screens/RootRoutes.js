import quanLySanPhamRoute from "./QuanLySanPham/QuanLySanPhamRoute";
import quanLyBanHangRoute from "./QuanLyBanHang/QuanLyBanHangRoute";
import quanLyPhieuDatHangRoute from "./QuanLyPhieuDatHang/QuanLyPhieuDatHangRoute";
import quanLyNhaCungCapRoute from "./QuanLyNhaCungCap/QuanLyNhaCungCapRoute";
import quanLyHangSanXuatRoute from "./QuanLyHangSanXuat/QuanLyHangSanXuatRoute";
import loginRoute from "./Login/LoginRoute";
import sessionRoute from "./session/sessionRoute";
import dashboarRoute from "./Dashboard/DashboardRoute";
const routes = [
  ...quanLySanPhamRoute,
  ...loginRoute,
  ...quanLyBanHangRoute,
  ...quanLyPhieuDatHangRoute,
  ...quanLyNhaCungCapRoute,
  ...quanLyHangSanXuatRoute,
  ...dashboarRoute,
  ...sessionRoute,
];

export default routes;
