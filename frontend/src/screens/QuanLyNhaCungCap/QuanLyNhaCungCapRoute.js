import QuanLyNhaCungCap from "./QuanLyNhaCungCap";
import { Layout } from "../../components/Layout";
import { QUANLYNHACUNGCAP } from "../../constants/authRoleConstant";
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
    role: QUANLYNHACUNGCAP,
  },
];

export default quanLyNhaCungCapRoute;
