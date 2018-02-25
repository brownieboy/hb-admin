import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import StageForm from "../components/stage-form.js";

// Dux
import { saveNewStage } from "../dux/stagesWriteReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveNewStageProp: saveNewStage }, dispatch);

const mapStateToProps = state => ({});

const ScheduleConn = connect(mapStateToProps, mapDispatchToProps)(StageForm);

export default ScheduleConn;
