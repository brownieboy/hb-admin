import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import DatesForm from "../components/dates-form.js";

// Dux
import { saveEditedDates } from "../dux/datesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitDataToServer: saveEditedDates }, dispatch);

const mapStateToProps = state => ({
  saveStatus: state.datesState.saveStatus,
  saveError: state.datesState.saveError,
  fetchStatus: state.datesState.fetchStatus,
  fetchError: state.datesState.fetchError,
  datesList: state.datesState.datesList,
  isEditExisting: true
});

const DatesFormConn = connect(mapStateToProps, mapDispatchToProps)(DatesForm);

export default DatesFormConn;
