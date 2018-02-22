import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Bands from "./bands.js";

// Dux stuff
import {
  loadBandsNow,
  selectors as bandSelectors
} from "../dux/bandsReducer.js";
import { selectors as appearancesSelectors } from "../dux/appearancesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBandsProp: loadBandsNow }, dispatch);

const mapStateToProps = state => ({
  bandsStateProp: state.bandsState
  // bandsAlphabeticalProp: bandSelectors.selectAlphabetical(state.bandsState),
  // appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
  //   state.appearancesState
  // )
});

const BandsConn = connect(mapStateToProps, mapDispatchToProps)(Bands);

export default BandsConn;
