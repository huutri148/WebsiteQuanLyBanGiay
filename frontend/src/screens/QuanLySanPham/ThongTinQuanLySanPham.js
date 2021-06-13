export const defaultGioiTinh = [
  { GioiTinh: "Nam" },
  { GioiTinh: "Nu" },
  { GioiTinh: "Unisex" },
];

export const DSSPHeadCells = [
  { id: "TenGiay", label: "Tên sản phẩm" },
  { id: "TenMau", label: "Tên màu", disableSorting: true },
  { id: "GioiTinh", label: "Giới tính", disableSorting: true },
  { id: "SoLuong", label: "Số lượng" },
  { id: "IsDeleted", label: "Trạng Thái" },
  { id: "actions" },
];

export const QuanLySanPhamTab = {
  DanhSachSanPham: 0,
  SanPhamForm: 1,
};

export const initialSanPham = {
  TenGiay: "",
  MaHangSanXuat: "",
  MaMau: 0,
  MoTa: "",
  GioiTinh: "",
  TyLeLoiNhuan: "",
  DonGiaNhap: 0,
  Size: [],
};
