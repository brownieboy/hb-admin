import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Schedule from "./schedule.js";

// Reducer
import {
  loadAppearances,
  selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadappearancesProp: loadAppearances }, dispatch);

const mapStateToProps = state => ({
  // appearancesProp: state.appearancesState,
  appearancesListByDateTime: appearanceSelectors.selectAppearancesByDateTime(
    state.appearancesState
  ),
  appearancesGroupedByDayThenStage: appearanceSelectors.selectAppearancesGroupedByDayThenStage(
    state.appearancesState
  )
});

const ScheduleConn = connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default ScheduleConn;
