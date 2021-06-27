import { Layout } from "../../components/Layout";
import QuanLyChi from "./QuanLyChi";
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
    role: 6,
  },
];

export default quanLyChiRoute;
