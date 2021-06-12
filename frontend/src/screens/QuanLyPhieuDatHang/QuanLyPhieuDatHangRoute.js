import QuanLyPhieuDatHang from "./QuanLyPhieuDatHang";
import { Layout } from "../../components/Layout";
const quanLyPhieuDatHang = () => (
  <Layout>
    <QuanLyPhieuDatHang />
  </Layout>
);

const quanLyPhieuDatHangRoute = [
  {
    path: "/orders",
    exact: true,
    component: quanLyPhieuDatHang,
    private: true,
  },
];

export default quanLyPhieuDatHangRoute;
