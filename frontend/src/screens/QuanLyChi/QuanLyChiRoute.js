import { Layout } from "../../components/Layout";
import QuanLyChi from "./QuanLyChi";
import { QUANLYPHIEUCHI } from "../../constants/authRoleConstant";
const quanLyChi = () => (
  <Layout>
    <QuanLyChi />
  </Layout>
);

const quanLyChiRoute = [
  {
    path: "/admin/paymentvouchers",
    exact: true,
    component: quanLyChi,
    private: true,
    role: QUANLYPHIEUCHI,
  },
];

export default quanLyChiRoute;
