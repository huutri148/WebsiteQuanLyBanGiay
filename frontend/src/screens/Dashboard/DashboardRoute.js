import Dashboard from "./Dashboard";
import { Layout } from "../../components/Layout";
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
    role: "NguoiDung",
  },
];

export default dashBoardRoute;
