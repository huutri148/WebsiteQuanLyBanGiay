import Login from "./Login";

const settings = {
  layout: { show: false },
};
const loginRoutes = [
  {
    path: "/login",
    exact: true,
    component: Login,
    settings,
  },
];

export default loginRoutes;
