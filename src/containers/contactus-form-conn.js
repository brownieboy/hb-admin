import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import ContactUsForm from "../components/contactus-form.js";

// Dux
import {
  // saveNewContactUs,
  saveEditedContactUs
} from "../dux/contactUsReducer.js";

const getCommonStateObject = state => ({
  fetchStatus: state.contactUsState.fetchStatus,
  fetchError: state.contactUsState.fetchError,
  saveStatus: state.contactUsState.saveStatus,
  saveError: state.contactUsState.saveError,
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
  startBlurb: state.contactUsState.startBlurb,
  email1: state.contactUsState.email1,
  email2: state.contactUsState.email2,
  mobile: state.contactUsState.mobile,
  gettingThereBlurb: state.contactUsState.gettingThereBlurb,
  mapLinkText: state.contactUsState.mapLinkText,
  venueAddress: state.contactUsState.venueAddress,
  venueEmail: state.contactUsState.venueEmail,
  venuePhone: state.contactUsState.venuePhone,
  isEditExisting: true
});

// export const ContactUsFormNewConn = connect(
//   mapStateToPropsNew,
//   mapDispatchToPropsNew
// )(ContactUsForm);

const ContactUsFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(ContactUsForm);

export default ContactUsFormEditConn;
