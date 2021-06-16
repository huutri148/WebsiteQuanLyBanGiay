import QuanLyGioHang from "./QuanLyGioHang";
import { Layout } from "../../components/Layout";
const quanLyGioHang = () => (
  <Layout>
    <QuanLyGioHang />
  </Layout>
);

const quanLyGioHangRoute = [
  {
    path: "/carts",
    exact: true,
    component: quanLyGioHang,
    private: true,
    role: "Admin",
  },
];

export default quanLyGioHangRoute;
