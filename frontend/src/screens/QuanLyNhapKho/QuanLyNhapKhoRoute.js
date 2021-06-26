import { Layout } from "../../components/Layout";
import QuanLyNhapKho from "./QuanLyNhapKho";
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
    role: "NhanVienKho",
  },
];

export default quanLyNhapKhoRoute;
