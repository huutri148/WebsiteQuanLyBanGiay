import Dashboard from "./Dashboard";
import { Layout } from "../../components/Layout";
import { DASHBOARD } from "../../constants/authRoleConstant";
const dashboard = () => (
  <Layout>
    <Dashboard />
  </Layout>
);

const dashBoardRoute = [
  {
    path: "/admin/dashboard",
    exact: true,
    component: dashboard,
    private: true,
    role: DASHBOARD,
  },
];

export default dashBoardRoute;
