import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import BandForm from "../components/band-form.js";

// Dux
import {
  saveNewBand,
  saveEditedBand,
  getBandInfoForId as getBandInfoForIdAction
} from "../dux/bandsReducer.js";

import {
  sendStorageCardStart,
  sendStorageThumbStart
} from "../dux/storageReducer.js";

const getCommonStateObject = state => ({
  saveStatus: state.bandsState.saveStatus,
  saveError: state.bandsState.saveError,
  // bandsListProp: state.bandsState.bandsList,
  getBandInfoForId: bandId =>
    getBandInfoForIdAction(state.bandsState.bandsList, bandId)
});

// So we're connecting the same form to Redux, but with different props
// and state depending on whether we're creating a new one or
// editing an existing one
const mapDispatchToPropsNew = dispatch =>
  bindActionCreators(
    {
      submitDataToServer: saveNewBand
    },
    dispatch
  );

const mapStateToPropsNew = state => ({
  ...getCommonStateObject(state),
  isEditExisting: false
});

const mapDispatchToPropsEdit = dispatch =>
  bindActionCreators(
    {
      submitDataToServer: saveEditedBand,
      sendStorageThumbStart,
      sendStorageCardStart
    },
    dispatch
  );
const mapStateToPropsEdit = state => ({
  ...getCommonStateObject(state),
  cardStatus: state.storageState.cardStatus,
  cardError: state.storageState.cardError,
  cardProgress: state.storageState.cardProgress,
  thumbStatus: state.storageState.thumbStatus,
  thumbError: state.storageState.thumbError,
  thumbProgress: state.storageState.thumbProgress,
  // thumbFullUrl: state.storageState.thumbFullUrl,
  isEditExisting: true
});

export const BandFormNewConn = connect(
  mapStateToPropsNew,
  mapDispatchToPropsNew
)(BandForm);

export const BandFormEditConn = connect(
  mapStateToPropsEdit,
  mapDispatchToPropsEdit
)(BandForm);
