import QuanLyBanHang from "./QuanLyBanHang";
import { Layout } from "../../components/Layout";
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
  },
];

export default quanLyBanHangRoute;
