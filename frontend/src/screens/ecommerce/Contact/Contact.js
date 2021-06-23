import React, { useEffect } from "react";
import "../../../components/App/App.css";
import Newsletter from "../../../components/Newsletter.js";
import Footer from "../../../components/Footer/Footer.js";
import BannerV2 from "../../../components/Banner/BannerV2.js";
import Header from "../../../components/Header/Header.js";
import bg from "../../../assets/contact.jpg";
import ContactBody from "./ContactBody.js";
import GetInTouch from "./GetInTouch";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className="Contact">
      <Header />
      <BannerV2 bannerImage={bg} position={"0px"} />
      <ContactBody />
      <GetInTouch />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default Contact;
