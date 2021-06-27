import BaoCaoLoiNhuan from "./BaoCaoLoiNhuan";
import { Layout } from "../../components/Layout";
import { BAOCAOLOINHUAN } from "../../constants/authRoleConstant";
const dashboard = () => (
  <Layout>
    <BaoCaoLoiNhuan />
  </Layout>
);

const dashBoardRoute = [
  {
    path: "/admin/proreport",
    exact: true,
    component: dashboard,
    private: true,
    role: BAOCAOLOINHUAN,
  },
];

export default dashBoardRoute;
