import { Layout } from "../../components/Layout";
import BaoCaoBanHang from "./BaoCaoBanHang";
import { BAOCAOBANHANG } from "../../constants/authRoleConstant";
const baoCaoBanHang = () => (
  <Layout>
    <BaoCaoBanHang />
  </Layout>
);

const baoCaoBanHangRoute = [
  {
    path: "/admin/reports",
    exact: true,
    component: baoCaoBanHang,
    private: true,
    role: BAOCAOBANHANG,
  },
];

export default baoCaoBanHangRoute;
