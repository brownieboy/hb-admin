import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";

import { login } from "../dux/firebaseLoginDux.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginProp: login }, dispatch);

const mapStateToProps = state => ({});

class LoginButton extends Component {
  handleLogin = () => {
    const { loginProp } = this.props;
    console.log("loginProp() calling");
    loginProp();
  };

  render() {
    return <Button onClick={this.handleLogin}>Login</Button>;
  }
}

const loginButtonConn = connect(mapStateToProps, mapDispatchToProps)(
  LoginButton
);

export default loginButtonConn;
