import Home from "./Home";
import Shop from "./Shop/shop";
import Contact from "./Contact/Contact";
import Checkout from "./Checkout/Chekout";
import ProductDetail from "./ProductDetail/ProductDetail";
import OpenChatBtn from "../../components/OpenChatBtn";

const home = () => {
  return (
    <div>
      <Home />
      <OpenChatBtn />
    </div>
  );
};

const shop = () => {
  return (
    <div>
      <Shop />
      <OpenChatBtn />
    </div>
  );
};

const contact = () => {
  return (
    <div>
      <Contact />
      <OpenChatBtn />
    </div>
  );
};
const checkout = () => {
  return (
    <div>
      <Checkout />
      <OpenChatBtn />
    </div>
  );
};

const detail = () => {
  return (
    <div>
      <ProductDetail />
      <OpenChatBtn />
    </div>
  );
};
const dashBoardRoute = [
  {
    path: "/home",
    exact: true,
    component: home,
    private: false,
    role: "NguoiDung",
  },
  {
    path: "/shop",
    exact: true,
    component: shop,
    private: false,
    role: "NguoiDung",
  },
  {
    path: "/contact",
    exact: true,
    component: contact,
    private: false,
    role: "NguoiDung",
  },
  {
    path: "/checkout",
    exact: true,
    component: checkout,
    private: false,
    role: "NguoiDung",
  },
  // {
  //   path: "/products/:id",
  //   exact: true,
  //   component: detail,
  //   private: true,
  //   role: "NguoiDung",
  // },
];

export default dashBoardRoute;
