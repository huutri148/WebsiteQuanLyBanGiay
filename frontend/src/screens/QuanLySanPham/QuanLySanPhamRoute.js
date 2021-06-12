import QuanLySanPham from "./QuanLySanPham";
import { Layout } from "../../components/Layout";
const quanLySanPham = () => (
  <Layout>
    <QuanLySanPham />
  </Layout>
);

const quanLySanPhamRoutes = [
  {
    path: "/products",
    exact: true,
    component: quanLySanPham,
    private: true,
  },
];

export default quanLySanPhamRoutes;
