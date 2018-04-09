import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { login, logout, getIsLoggedIn } from "../dux/firebaseLoginReducer.js";
import LoginEmailForm from "../components/login-email-form.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginProp: login, logoutProp: logout }, dispatch);

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

const LoginEmailFormConn = connect(mapStateToProps, mapDispatchToProps)(
  LoginEmailForm
);

export default LoginEmailFormConn;
