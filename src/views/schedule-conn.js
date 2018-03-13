import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Schedule from "./schedule.js";

// Reducer
import {
  loadAppearances,
  selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

// Important - from the mainReducer, so we can give it whole state?
import { getAppearancesWithBandAndStageNames } from "../dux/mainReducer.js";

import { getBandInfoForId as getBandInfoIdAction } from "../dux/bandsReducer.js";
import { getStageInfoForId as getStageInfoIdAction } from "../dux/stagesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadappearancesProp: loadAppearances }, dispatch);

const mapStateToProps = state => ({
  // appearancesProp: state.appearancesState,
  fetchStatus: state.appearancesState.fetchStatus,
  fetchError: state.appearancesState.fetchError,
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
    getStageInfoIdAction(state.stagesState.stagesList, stageId),
  appearancesWithBandAndStageNames: () => getAppearancesWithBandAndStageNames(state)
});

/*
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all'),
});
 */

const ScheduleConn = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default ScheduleConn;
