import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import ScheduleForm from "../components/schedule-form.js";

// Dux
import {
  saveNewAppearance,
  saveEditedAppearance,
  saveAppearanceClear,
  getAppearanceInfoForId as getAppearanceInfoForIdAction
} from "../dux/appearancesReducer.js";

import { selectors as bandsSelectors } from "../dux/bandsReducer.js";
import { selectors as stagesSelectors } from "../dux/stagesReducer.js";

// appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
//   state.appearancesState
// ),

const getCommonStateObject = state => ({
  saveStatus: state.appearancesState.saveStatus,
  fetchStatus: state.appearancesState.fetchStatus,
  fetchError: state.appearancesState.fetchError,
  saveError: state.appearancesState.saveError,
  bandsPicker: bandsSelectors.selectBandsPicker(state.bandsState),
  stagesPicker: stagesSelectors.selectStagesPicker(state.stagesState),
  datesList: state.datesState.datesList
});

// So we're connecting the same form to Redux, but with different props
// and state depending on whether we're creating a new one or
// editing an existing one
const mapDispatchToPropsNew = dispatch =>
  bindActionCreators(
    { submitDataToServer: saveNewAppearance, saveAppearanceClear },
    dispatch
  );
const mapStateToPropsNew = state => ({
  ...getCommonStateObject(state),
  isEditExisting: false
});

const mapDispatchToPropsEdit = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedAppearance }, dispatch);
const mapStateToPropsEdit = state => ({
  ...getCommonStateObject(state),
  isEditExisting: true,
  getAppearanceInfoForId: appearanceId =>
    getAppearanceInfoForIdAction(
      state.appearancesState.appearancesList,
      appearanceId
    )
});

export const ScheduleFormNewConn = connect(
  mapStateToPropsNew,
  mapDispatchToPropsNew
)(ScheduleForm);

export const ScheduleFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(ScheduleForm);
