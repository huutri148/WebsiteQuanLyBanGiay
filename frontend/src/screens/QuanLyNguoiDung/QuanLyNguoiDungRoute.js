import QuanLyNguoiDung from "./QuanLyNguoiDung";
import { Layout } from "../../components/Layout";
import { QUANLYNGUOIDUNG } from "../../constants/authRoleConstant";
const quanLyNguoiDung = () => (
  <Layout>
    <QuanLyNguoiDung />
  </Layout>
);

const quanLyNguoiDungRoute = [
  {
    path: "/admin/users",
    exact: true,
    component: quanLyNguoiDung,
    private: true,
    role: QUANLYNGUOIDUNG,
  },
];

export default quanLyNguoiDungRoute;
