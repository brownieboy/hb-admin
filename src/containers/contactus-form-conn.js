import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import ContactUsForm from "../components/contactus-form.js";

// Dux
import {
  // saveNewContactUs,
  saveEditedContactUs
} from "../dux/homeReducer.js";

const getCommonStateObject = state => ({
  fetchStatus: state.datesState.fetchStatus,
  fetchError: state.datesState.fetchError,
  saveStatus: state.homeState.saveStatus,
  saveError: state.homeState.saveError,
  isLoggedIn: state.firebaseLoginState.loggedIn
});

// So we're connecting the same form to Redux, but with different props
// and state depending on whether we're creating a new one or
// editing an existing one
// const mapDispatchToPropsNew = dispatch =>
//   bindActionCreators({ submitDataToServer: saveNewContactUs }, dispatch);
// const mapStateToPropsNew = state => ({
//   ...getCommonStateObject(state),
//   isEditExisting: false
// });

const mapDispatchToPropsEdit = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedContactUs }, dispatch);
const mapStateToPropsEdit = state => ({
  ...getCommonStateObject(state),
  homeText: state.homeState.homeText,
  isEditExisting: true
});

// export const ContactUsFormNewConn = connect(
//   mapStateToPropsNew,
//   mapDispatchToPropsNew
// )(ContactUsForm);

const ContactUsFormEditConn = connect(mapStateToPropsEdit, mapDispatchToPropsEdit)(
  ContactUsForm
);

export default ContactUsFormEditConn;
