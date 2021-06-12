import QuanLyNhaCungCap from "./QuanLyNhaCungCap";
import { Layout } from "../../components/Layout";
const quanLyNhaCungCap = () => (
  <Layout>
    <QuanLyNhaCungCap />
  </Layout>
);

const quanLyNhaCungCapRoute = [
  {
    path: "/suppliers",
    exact: true,
    component: quanLyNhaCungCap,
  },
];

export default quanLyNhaCungCapRoute;
