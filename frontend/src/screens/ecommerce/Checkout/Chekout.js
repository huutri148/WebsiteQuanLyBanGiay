import React, { useEffect } from "react";
import "../../../components/App/App.css";
import BannerV4 from "../../../components/Banner/BannerV4";
import CheckoutBody from "./CheckoutBody";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Newsletter from "../../../components/Newsletter";

function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className="Contact">
      <Header />
      <BannerV4 bannerImage={""} collectionTitle={"Checkout"} />
      <CheckoutBody />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default Checkout;
