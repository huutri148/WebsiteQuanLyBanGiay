import QuanLySanPham from "./QuanLySanPham";

const settings = {
  layout: { show: true },
};
const quanLySanPhamRoutes = [
  {
    path: "/products",
    exact: true,
    component: QuanLySanPham,
    settings,
  },
];

export default quanLySanPhamRoutes;
