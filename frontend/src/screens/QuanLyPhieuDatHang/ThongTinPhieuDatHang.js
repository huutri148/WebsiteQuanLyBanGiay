export const thongTinPhieu = [
  {
    type: "Select",
    title: "Tên nhà cung cấp",
    required: true,
    options: [{ value: 1, label: "Khách Vãng Lai" }],
    onChange: (e) => (thongTinPhieu[0].value = e),
    validationTip: "Tên nhà cung cấp không được trống",
    error: false,
    checkValidation: (val) => false,
  },
  {
    type: "TextBox",
    title: "Người Lập",
    required: true,
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
  { id: "GioiTinh", label: "Giới Tính" },
  { id: "Size", label: "Size" },
  { id: "SoLuong", label: "Số Lượng" },
];
