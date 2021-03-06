import QuanLyPhieuDatHang from "./QuanLyPhieuDatHang";
import { Layout } from "../../components/Layout";
import { QUANLYDATHANG } from "../../constants/authRoleConstant";
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
    role: QUANLYDATHANG,
  },
];

export default quanLyPhieuDatHangRoute;
