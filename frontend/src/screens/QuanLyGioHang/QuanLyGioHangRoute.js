import QuanLyGioHang from "./QuanLyGioHang";
import { Layout } from "../../components/Layout";
import { QUANLYGIOHANG } from "../../constants/authRoleConstant";
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
    role: QUANLYGIOHANG,
  },
];

export default quanLyGioHangRoute;
