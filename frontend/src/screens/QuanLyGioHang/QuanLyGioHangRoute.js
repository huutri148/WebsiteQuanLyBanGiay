import QuanLyGioHang from "./QuanLyGioHang";
import { Layout } from "../../components/Layout";
const quanLyGioHang = () => (
  <Layout>
    <QuanLyGioHang />
  </Layout>
);

const quanLyGioHangRoute = [
  {
    path: "/admin/carts",
    exact: true,
    component: quanLyGioHang,
    private: true,
    role: 7,
  },
];

export default quanLyGioHangRoute;
