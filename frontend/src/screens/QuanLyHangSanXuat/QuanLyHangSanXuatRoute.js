import QuanLyHangSanXuat from "./QuanLyHangSanXuat";
import { Layout } from "../../components/Layout";
const quanLyHangSanXuat = () => (
  <Layout>
    <QuanLyHangSanXuat />
  </Layout>
);

const quanLyHangSanXuatRoute = [
  {
    path: "/brands",
    exact: true,
    component: quanLyHangSanXuat,
    private: true,
    role: "Admin",
  },
];

export default quanLyHangSanXuatRoute;
