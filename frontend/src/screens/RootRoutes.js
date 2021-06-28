import quanLySanPhamRoute from "./QuanLySanPham/QuanLySanPhamRoute";
import quanLyBanHangRoute from "./QuanLyBanHang/QuanLyBanHangRoute";
import quanLyNhapKhoRoute from "./QuanLyNhapKho/QuanLyNhapKhoRoute";
import quanLyChiRoute from "./QuanLyChi/QuanLyChiRoute";
import quanLyPhieuDatHangRoute from "./QuanLyPhieuDatHang/QuanLyPhieuDatHangRoute";
import quanLyNhaCungCapRoute from "./QuanLyNhaCungCap/QuanLyNhaCungCapRoute";
import quanLyHangSanXuatRoute from "./QuanLyHangSanXuat/QuanLyHangSanXuatRoute";
import loginRoute from "./Login/LoginRoute";
import sessionRoute from "./session/sessionRoute";
import dashboarRoute from "./Dashboard/DashboardRoute";
import quanLyNguoiDungRoute from "./QuanLyNguoiDung/QuanLyNguoiDungRoute";
import quanLyGioHangRoute from "./QuanLyGioHang/QuanLyGioHangRoute";
import ecommerceRoute from "./ecommerce/ecommerceRoute";
import inboxRoute from "./Inbox/InboxRoute";
import baoCaoBanHangRoute from "./BaoCaoBanHang/BaoCaoBanHangRoute";
import baoCaoLoiNhuanRoute from "./BaoCaoLoiNhuan/BaoCaoLoiNhuanRoute";
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
  ...ecommerceRoute,
  ...inboxRoute,
  ...quanLyChiRoute,
  ...baoCaoBanHangRoute,
  ...baoCaoLoiNhuanRoute,
];

export default routes;
