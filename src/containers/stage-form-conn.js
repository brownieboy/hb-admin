import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import StageForm from "../components/stage-form.js";

// Dux
import {
  saveNewStage,
  getStageInfoForId as getStageInfoForIdAction
} from "../dux/stagesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveNewStageProp: saveNewStage }, dispatch);

const mapStateToProps = state => ({
  getStageInfoForId: stageId =>
    getStageInfoForIdAction(state.stagesState.stagesList, stageId)
});

const ScheduleConn = connect(mapStateToProps, mapDispatchToProps)(StageForm);

export default ScheduleConn;

/*
const mapStateToProps = state => ({
  // appearancesProp: state.appearancesState,
  appearancesListByDateTime: appearanceSelectors.selectAppearancesByDateTime(
    state.appearancesState
  ),
  appearancesGroupedByDayThenStage: appearanceSelectors.selectAppearancesGroupedByDayThenStage(
    state.appearancesState
  ),
  // Not really State, and returns a function, but what the hell
  getBandInfoForId: bandId =>
    getBandInfoIdAction(state.bandsState.bandsList, bandId),
  getStageInfoForId: stageId =>
    getStageInfoIdAction(state.stagesState.stagesList, stageId)
});

 */
