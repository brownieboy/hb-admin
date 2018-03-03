import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import HomeForm from "../components/stage-form.js";

// Dux
import {
  saveNewHome,
  saveEditedHome
} from "../dux/homeReducer.js";

const getCommonStateObject = state => ({
  saveStatus: state.homeState.saveStatus,
  saveError: state.homeState.saveError });


// So we're connecting the same form to Redux, but with different props
// and state depending on whether we're creating a new one or
// editing an existing one
const mapDispatchToPropsNew = dispatch =>
  bindActionCreators({ submitDataToServer: saveNewHome }, dispatch);
const mapStateToPropsNew = state => ({
  ...getCommonStateObject(state),
  isEditExisting: false
});

const mapDispatchToPropsEdit = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedHome }, dispatch);
const mapStateToPropsEdit = state => ({
  ...getCommonStateObject(state),
  isEditExisting: true
});

export const HomeFormNewConn = connect(
  mapStateToPropsNew,
  mapDispatchToPropsNew
)(HomeForm);

export const HomeFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(HomeForm);