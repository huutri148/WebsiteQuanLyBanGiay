import QuanLyPhieuDatHang from "./QuanLyPhieuDatHang";
import { Layout } from "../../components/Layout";
const quanLyPhieuDatHang = () => (
  <Layout>
    <QuanLyPhieuDatHang />
  </Layout>
);

const quanLyPhieuDatHangRoute = [
  {
    path: "/admin/orders",
    exact: true,
    component: quanLyPhieuDatHang,
    private: true,
    role: 5,
  },
];

export default quanLyPhieuDatHangRoute;
