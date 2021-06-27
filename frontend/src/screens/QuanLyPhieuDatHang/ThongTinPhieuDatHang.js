export const thongTinPhieu = [
  {
    type: "Select",
    title: "Tên nhà cung cấp",
    required: true,
    options: [],
    onChange: (e) => (thongTinPhieu[0].value = e),
    validationTip: "Tên nhà cung cấp không được trống",
    error: false,
    checkValidation: (val) => false,
  },
  {
    type: "TextBox",
    title: "Người Lập",
    required: false,
    disabled: "disabled",
    checkValidation: (val) => false,
  },
  {
    type: "Picker",
    title: "Ngày Lập",
    onChange: (e) => (thongTinPhieu[2].value = e.target.value),
    required: true,
    checkValidation: (val) => false,
  },
];

export const CTPHHeadCell = [
  { id: "TenGiay", label: "Tên Giày" },
  { id: "TenSize", label: "Size" },
  { id: "SoLuongDat", label: "Số Lượng Đặt" },
  { id: "Actions" },
];

export const QuanLyPhieuDatHangTab = {
  DanhSachPhieuDatHang: 0,
  PhieuDatHangForm: 1,
};

export const DSPDHHeadCell = [
  { id: "SoPhieuDatHang", label: "Số phiếu" },
  { id: "TenNhaCungCap", label: "Nhà cung cấp", disableSorting: true },
  { id: "TenNguoiDung", label: "Người đặt", disableSorting: true },
  { id: "TrangThai", label: "Trạng Thái" },
  { id: "NgayDat", label: "Ngày đặt" },
  { id: "actions" },
];
