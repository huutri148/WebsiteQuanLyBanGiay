import React, { Component } from "react";
import { authenticate } from "../jwtAuthService";
export default class AuthenticateBeforeRender extends Component {
  state = {
    isAuthenticated: false,
  };

  componentDidMount() {
    authenticate().then((isAuthenticated) => {
      this.setState({ isAuthenticated });
    });
  }
  render() {
    return this.state.isAuthenticated ? this.props.render() : null;
  }
}
