import DashboardInbox from "./Inbox";
import { Layout } from "../../components/Layout";
const dashboardInbox = () => (
  <Layout>
    <DashboardInbox />
  </Layout>
);

const iboxRoute = [
  {
    path: "/admin/inbox",
    exact: true,
    component: dashboardInbox,
    private: false,
  },
];

export default iboxRoute;
