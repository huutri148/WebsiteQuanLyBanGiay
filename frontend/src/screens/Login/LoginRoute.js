import { Login } from "./Login";

const loginRoute = [
  {
    path: "/admin/login",
    exact: true,
    component: Login,
    private: false,
  },
];

export default loginRoute;
