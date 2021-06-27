import { Layout } from "../../components/Layout";
import QuanLyBanHang from "./QuanLyBanHang";
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
    role: 2,
  },
];

export default quanLyBanHangRoute;
