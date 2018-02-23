// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Stages from "./stages.js";


const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  stagesListProp: state.stagesState.stagesList
  // appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
  //   state.appearancesState
  // )
});

const StagesConn = connect(mapStateToProps, mapDispatchToProps)(Stages);

export default StagesConn;
