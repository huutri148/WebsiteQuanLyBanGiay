import React, { Component } from "react";
import "../../../components/App/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

export default class ContactBody extends Component {
  render() {
    return (
      <div className="ContactBody">
        <div className="contact-info">
          <div className="contact-info-title">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </div>
          <div className="contact-info-detail">
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faHome} className="contact-icon" />
              <p className="contact-info-title2">ADDRESS</p>
              <p>
                08A Trần Thị Minh Khai, Thị Trấn Đăk Hà, Huyện Đăk Hà, Tỉnh Kon
                Tum
              </p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <p className="contact-info-title2">phone</p>
              <p>+0866074947</p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faMailBulk} className="contact-icon" />
              <p className="contact-info-title2">email</p>
              <p>huutri148@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
