import QuanLyHangSanXuat from "./QuanLyHangSanXuat";
import { Layout } from "../../components/Layout";
import { QUANLYSANPHAM } from "../../constants/authRoleConstant";
const quanLyHangSanXuat = () => (
  <Layout>
    <QuanLyHangSanXuat />
  </Layout>
);

const quanLyHangSanXuatRoute = [
  {
    path: "/admin/brands",
    exact: true,
    component: quanLyHangSanXuat,
    private: true,
    role: QUANLYSANPHAM,
  },
];

export default quanLyHangSanXuatRoute;
