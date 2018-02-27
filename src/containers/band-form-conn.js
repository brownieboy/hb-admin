import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import { BandNewForm, BandEditForm } from "../components/band-form.js";

// Dux
import {
  saveNewBand,
  saveEditedBand,
  getBandInfoForId as getBandInfoForIdAction
} from "../dux/bandsReducer.js";

const mapDispatchToPropsNew = dispatch =>
  bindActionCreators({ submitDataToServer: saveNewBand }, dispatch);

const mapStateToPropsNew = state => ({
  saveStatus: state.bandsState.saveStatus,
  saveError: state.bandsState.saveError
});

const mapDispatchToPropsEdit = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedBand }, dispatch);

const mapStateToPropsEdit = state => ({
  saveStatus: state.BandsState.saveStatus,
  saveError: state.BandsState.saveError,
  getBandInfoForId: bandId =>
    getBandInfoForIdAction(state.bandsState.bandsList, bandId)
});

export const BandFormNewConn = connect(
  mapStateToPropsNew,
  mapDispatchToPropsNew
)(BandNewForm);

export const BandFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(BandEditForm);
