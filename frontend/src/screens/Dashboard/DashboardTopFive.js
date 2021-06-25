import React from "react";
import "../../components/App/App.css";
import "../../styles/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardTopFive(props) {
  const data = props.data;

  return (
    <div className="topfive flex-col">
      <div className={`headerbox flex-center ${props.color}`}>
        <FontAwesomeIcon icon={props.icon} className="icon" />
      </div>
      <div className="top-location-container">
        <div className="headerbox-header">
          <p>{props.title}</p>
        </div>
        <div className="topfive-content flex">
          <div className="topfive-list">
            <div className="top-location-div topfive-div flex header">
              {props.table &&
                props.table.map((item, index) => {
                  return (
                    <div key={index} className="topfive-header">
                      {item.title}
                    </div>
                  );
                })}
            </div>
            {data &&
              data.slice(0, 5).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="top-location-div topfive-div flex"
                  >
                    <div
                      style={{ width: "80%", textAlign: "left" }}
                      className="top-user flex"
                    >
                      <img src={item.Anh} className="top-user-avt" alt=""></img>
                      <p className="top-user-name">{item.TenSanPham}</p>
                    </div>
                    <div style={{ width: "80px", textAlign: "center" }}>
                      {item.SoLuongMua}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
