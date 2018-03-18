import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteStages } from "../dux/stagesReducer.js";

// Components
import Stages from "./stages.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteStages }, dispatch);

const mapStateToProps = state => ({
  fetchStatus: state.stagesState.fetchStatus,
  fetchError: state.stagesState.fetchError,
  stagesListProp: state.stagesState.stagesList
});

const StagesConn = connect(mapStateToProps, mapDispatchToProps)(Stages);

export default StagesConn;
