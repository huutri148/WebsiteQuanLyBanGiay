import { Dashboard } from "./Dashboard";
import { Layout } from "../../components/Layout";
const dashboard = () => (
  <Layout>
    <Dashboard />
  </Layout>
);

const dashBoardRoute = [
  {
    path: "/",
    exact: true,
    component: dashboard,
    private: true,
  },
];

export default dashBoardRoute;
