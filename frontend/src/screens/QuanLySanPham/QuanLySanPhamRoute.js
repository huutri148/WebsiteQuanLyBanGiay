import QuanLySanPham from "./QuanLySanPham";
import { Layout } from "../../components/Layout";
import { QUANLYSANPHAM } from "../../constants/authRoleConstant";
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
    role: QUANLYSANPHAM,
  },
];

export default quanLySanPhamRoutes;
