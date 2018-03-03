import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import DatesForm from "../components/dates-form.js";

// Dux
import { saveEditedDates } from "../dux/datesReducer.js";

const getCommonStateObject = state => ({
  saveStatus: state.homeState.saveStatus,
  saveError: state.homeState.saveError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedDates }, dispatch);
const mapStateToProps = state => ({
  ...getCommonStateObject(state),
  isEditExisting: true
});

const DatesFormConn = connect(mapStateToProps, mapDispatchToProps)(DatesForm);

export default DatesFormConn;
