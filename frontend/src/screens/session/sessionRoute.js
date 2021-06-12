import NotFound from "./NotFound";

const sessionRoute = [
  {
    path: "/session/404",
    exact: true,
    component: NotFound,
    private: false,
  },
];

export default sessionRoute;
