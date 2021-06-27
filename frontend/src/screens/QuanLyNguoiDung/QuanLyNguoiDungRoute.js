import QuanLyNguoiDung from "./QuanLyNguoiDung";
import { Layout } from "../../components/Layout";
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
    role: 3,
  },
];

export default quanLyNguoiDungRoute;
