export const authRoles = {
  Admin: [1], // Only Admin has access
  NhanVienBanHang: [2, 1], // Only Admin & NhanVienBanHang has access
  NhanVienKho: [4, 1], // Only Admin & NhanVienKho has access
  KeToan: [3, 1], //Only Admin & NhanVienKeToan has access
  NguoiDung: [5, 4, 2, 3, 1], // Everyone has access
};
