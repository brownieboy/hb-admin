// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Stages from "./stages.js";

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  fetchStatus: state.stagesState.fetchStatus,
  fetchError: state.stagesState.fetchError,
  stagesListProp: state.stagesState.stagesList
});

const StagesConn = connect(mapStateToProps, mapDispatchToProps)(Stages);

export default StagesConn;
