import QuanLySanPham from "./QuanLySanPham";
import { Layout } from "../../components/Layout";
const quanLySanPham = () => (
  <Layout>
    <QuanLySanPham />
  </Layout>
);

const quanLySanPhamRoutes = [
  {
    path: "/admin/products",
    exact: true,
    component: quanLySanPham,
    private: true,
    role: 1,
  },
];

export default quanLySanPhamRoutes;
