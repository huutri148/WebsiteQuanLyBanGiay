import { Layout } from "../../components/Layout";
import QuanLyBanHang from "../QuanLyBanHang";
const quanLyBanHang = () => (
  <Layout>
    <QuanLyBanHang />
  </Layout>
);

const quanLyBanHangRoute = [
  {
    path: "/bills",
    exact: true,
    component: quanLyBanHang,
    private: true,
    role: "NhanVienBanHang",
  },
];

export default quanLyBanHangRoute;
