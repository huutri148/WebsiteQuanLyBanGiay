import QuanLyHangSanXuat from "./QuanLyHangSanXuat";
import { Layout } from "../../components/Layout";
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
    role: 1,
  },
];

export default quanLyHangSanXuatRoute;
