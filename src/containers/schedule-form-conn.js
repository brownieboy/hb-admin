import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import ScheduleForm from "../components/schedule-form.js";

// Dux
import {
  saveNewAppearance,
  saveEditedAppearance
  // getAppearanceInfoForId as getAppearanceInfoForIdAction
} from "../dux/appearancesReducer.js";

const getCommonStateObject = state => ({
  saveStatus: state.appearancesState.saveStatus,
  saveError: state.appearancesState.saveError
  // getAppearanceInfoForId: appearanaceId =>
  //   getAppearanceInfoForIdAction(state.appearancesState.appearancesList, appearanaceId)
});

// So we're connecting the same form to Redux, but with different props
// and state depending on whether we're creating a new one or
// editing an existing one
const mapDispatchToPropsNew = dispatch =>
  bindActionCreators({ submitDataToServer: saveNewAppearance }, dispatch);
const mapStateToPropsNew = state => ({
  ...getCommonStateObject(state),
  isEditExisting: false
});

const mapDispatchToPropsEdit = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedAppearance }, dispatch);
const mapStateToPropsEdit = state => ({
  ...getCommonStateObject(state),
  isEditExisting: true
});

export const ScheduleFormNewConn = connect(
  mapStateToPropsNew,
  mapDispatchToPropsNew
)(ScheduleForm);

export const ScheduleFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(ScheduleForm);
