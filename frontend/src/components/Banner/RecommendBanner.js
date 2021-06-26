import React from "react";
import "../App/App.css";
import women from "../../assets/women.jpg";
import b4 from "../../assets/b4.jpg";
import arrival from "../../assets/arrival.jpg";
import man from "../../assets/man.jpg";
// import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from "react-router-dom";

export default function RecommendBanner() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="RecommendBanner flex-center">
      <div className="RecommendBanner-container flex-center">
        <div className="banner-box img-hover">
          <img src={arrival} alt="banner" width="100%" height="100%"></img>
          <div className="blackbox-center-container">
            <div className="blackbox-title">New Arrivals</div>
            <div className="blackbox-center">
              <Link
                className="blackbox-link a"
                to="/shop"
                onClick={handleClick}
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
        <div className="banner-box">
          <div className="banner-top flex-center">
            <div className="banner-top2 img-hover">
              <img src={women} alt="banner" width="100%" height="100%"></img>
              <div className="blackbox-center-container">
                <div className="blackbox-title blackbox-title-small">Woman</div>
                <div className="blackbox-center">
                  <Link
                    className="blackbox-link blackbox-link-smaill a"
                    to="/women"
                    onClick={handleClick}
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
            <div className="banner-top2 img-hover">
              <img src={man} alt="banner" width="100%" height="100%"></img>
              <div className="blackbox-center-container">
                <div className="blackbox-title blackbox-title-small">Man</div>
                <div className="blackbox-center">
                  <Link
                    className="blackbox-link blackbox-link-smaill a"
                    to="/men"
                    onClick={handleClick}
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-bottom img-hover">
            <img src={b4} alt="banner" width="100%" height="100%"></img>
            <div className="blackbox-center-container">
              <div className="blackbox-title blackbox-title-medium">
                Free Shipping On All Orders
              </div>
              <div className="blackbox-center">
                <Link
                  className="blackbox-link blackbox-link-medium a"
                  to="/shop"
                  onClick={handleClick}
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
