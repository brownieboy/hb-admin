import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import BandForm from "../components/band-form.js";

// Dux
import {
  bandStartCardFileUpload,
  bandStartThumbFileUpload,
  saveNewBand,
  saveEditedBand,
  saveBandClear,
  getBandInfoForId as getBandInfoForIdAction
} from "../dux/bandsReducer.js";

// import {
//   sendStorageCardStart,
//   sendStorageThumbStart
// } from "../dux/storageReducer.js";

import { notifyInfo } from "../dux/react-redux-notify-helpers.js";

const getCommonStateObject = state => ({
  saveStatus: state.bandsState.saveStatus,
  saveError: state.bandsState.saveError,
  // bandsListProp: state.bandsState.bandsList,
  getBandInfoForId: bandId =>
    getBandInfoForIdAction(state.bandsState.bandsList, bandId),
  isLoggedIn: state.firebaseLoginState.loggedIn
});

// So we're connecting the same form to Redux, but with different props
// and state depending on whether we're creating a new one or
// editing an existing one
const mapDispatchToPropsNew = dispatch =>
  bindActionCreators(
    {
      notifyInfo,
      submitDataToServer: saveNewBand,
      saveBandClear
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
      notifyInfo,
      submitDataToServer: saveEditedBand,
      sendStorageThumbStart: bandStartThumbFileUpload,
      sendStorageCardStart: bandStartCardFileUpload
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
