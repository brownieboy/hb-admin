import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Bands from "./bands.js";

// Dux stuff
import {
  loadBandsNow,
  deleteBands,
  selectors as bandSelectors
} from "../dux/bandsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteBands, loadBandsProp: loadBandsNow }, dispatch);

const mapStateToProps = state => ({
  fetchStatus: state.bandsState.fetchStatus,
  fetchError: state.bandsState.fetchError,
  bandsListProp: state.bandsState.bandsList,
  bandsAlphabeticalProp: bandSelectors.selectAlphabetical(state.bandsState)
  // appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
  //   state.appearancesState
  // )
});

const BandsConn = connect(mapStateToProps, mapDispatchToProps)(Bands);

export default BandsConn;
