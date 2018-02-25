import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import { StageNewForm, StageEditForm } from "../components/stage-form.js";

// Dux
import {
  saveNewStage,
  saveEditedStage,
  getStageInfoForId as getStageInfoForIdAction
} from "../dux/stagesReducer.js";

const mapDispatchToPropsNew = dispatch =>
  bindActionCreators({ submitDataToServer: saveNewStage }, dispatch);

const mapStateToPropsNew = () => ({});

const mapDispatchToPropsEdit = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedStage }, dispatch);

const mapStateToPropsEdit = state => ({
  getStageInfoForId: stageId =>
    getStageInfoForIdAction(state.stagesState.stagesList, stageId)
});

export const StageFormNewConn = connect(
  mapStateToPropsNew,
  mapDispatchToPropsNew
)(StageNewForm);

export const StageFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(StageEditForm);


