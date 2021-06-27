import QuanLyNhaCungCap from "./QuanLyNhaCungCap";
import { Layout } from "../../components/Layout";
const quanLyNhaCungCap = () => (
  <Layout>
    <QuanLyNhaCungCap />
  </Layout>
);

const quanLyNhaCungCapRoute = [
  {
    path: "/admin/suppliers",
    exact: true,
    component: quanLyNhaCungCap,
    private: true,
    role: 4,
  },
];

export default quanLyNhaCungCapRoute;
