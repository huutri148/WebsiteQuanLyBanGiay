import React, { Component } from "react";
import "../../../components/App/App.css";

class GoogleMap extends Component {
  render() {
    return (
      <div className="google-map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15449.225670699281!2d107.91764275!3d14.524457400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1624205834630!5m2!1sen!2s"
          width="100%"
          height="100%"
          frameBorder="0"
          aria-hidden="false"
          tabIndex="0"
        />
      </div>
    );
  }
}

export default GoogleMap;
