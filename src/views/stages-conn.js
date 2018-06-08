import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  deleteStages,
  getStageInfoForId,
  selectStages
} from "../dux/stagesReducer.js";
import { getAppearancesForStageId } from "../dux/appearancesReducer.js";

// Components
import Stages from "./stages.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteStages }, dispatch);

const mapStateToProps = state => ({
  fetchStatus: state.stagesState.fetchStatus,
  fetchError: state.stagesState.fetchError,
  stagesListProp: selectStages(state),
  // Not really State, and returns a function, but what the hell
  getAppearancesForStageId: stageId =>
    getAppearancesForStageId(state.appearancesState.appearancesList, stageId),
  getStageInfoForId: stageId =>
    getStageInfoForId(state.stagesState.stagesList, stageId),
  isLoggedIn: state.firebaseLoginState.loggedIn
});

const StagesConn = connect(mapStateToProps, mapDispatchToProps)(Stages);

export default StagesConn;
