import { Login } from "./Login";

const loginRoute = [
  {
    path: "/login",
    exact: true,
    component: Login,
    private: false,
  },
];

export default loginRoute;
