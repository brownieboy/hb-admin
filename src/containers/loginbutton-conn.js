import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";

import { loginSubmit } from "../dux/firebaseLoginDux.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginSubmitProp: loginSubmit }, dispatch);

const mapStateToProps = state => ({});

class LoginButton extends Component {
  handleLogin = () => {
    const { loginSubmitProp } = this.props;
    console.log("loginSubmitProp() calling");
    loginSubmitProp();
  };

  render() {
    return <Button onClick={this.handleLogin}>Login</Button>;
  }
}

const loginButtonConn = connect(mapStateToProps, mapDispatchToProps)(
  LoginButton
);

export default loginButtonConn;
