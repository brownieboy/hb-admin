import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Schedule from "./schedule.js";

// Reducer
import {
  loadAppearances,
  selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

import { getBandInfoForId as getBandInfoIdAction } from "../dux/bandsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadappearancesProp: loadAppearances }, dispatch);

const mapStateToProps = state => ({
  // appearancesProp: state.appearancesState,
  appearancesListByDateTime: appearanceSelectors.selectAppearancesByDateTime(
    state.appearancesState
  ),
  appearancesGroupedByDayThenStage: appearanceSelectors.selectAppearancesGroupedByDayThenStage(
    state.appearancesState
  ),
  // Not really State, and returns a function, but what the hell
  getBandInfoForId: bandId => getBandInfoIdAction(state.bandsState.bandsList, bandId)
});

const ScheduleConn = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default ScheduleConn;
