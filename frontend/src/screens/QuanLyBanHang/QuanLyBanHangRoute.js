import { Layout } from "../../components/Layout";
import QuanLyBanHang from "./QuanLyBanHang";
import { QUANLYBANHANG } from "../../constants/authRoleConstant";
const quanLyBanHang = () => (
  <Layout>
    <QuanLyBanHang />
  </Layout>
);

const quanLyBanHangRoute = [
  {
    path: "/admin/bills",
    exact: true,
    component: quanLyBanHang,
    private: true,
    role: QUANLYBANHANG,
  },
];

export default quanLyBanHangRoute;
