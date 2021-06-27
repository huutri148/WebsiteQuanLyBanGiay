import { Layout } from "../../components/Layout";
import QuanLyNhapKho from "./QuanLyNhapKho";
import { QUANLYNHAPKHO } from "../../constants/authRoleConstant";
const quanLyNhapKho = () => (
  <Layout>
    <QuanLyNhapKho />
  </Layout>
);

const quanLyNhapKhoRoute = [
  {
    path: "/admin/recdockets",
    exact: true,
    component: quanLyNhapKho,
    private: true,
    role: QUANLYNHAPKHO,
  },
];

export default quanLyNhapKhoRoute;
