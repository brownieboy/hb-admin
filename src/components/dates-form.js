// Render Prop
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label } from "reactstrap";
import { format as dateFnsFormat } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import dateFnsLocalizer from "react-widgets-date-fns";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import { dateFormatString } from "../constants/formats.js";
import {
  LoadStatusIndicator,
  SaveStatusIndicator
} from "./loadsaveindicator.js";
import NotLoggedInWarning from "../components/not-logged-in-warning.js";

// const formats = Object.assign(defaultFormats, { default: "DD/MM/YYYY" });
// dateFnsLocalizer(formats, { "en-GB": enGB });
// dateFnsLocalizer({ "en-GB": enGB });
dateFnsLocalizer({ locales: { "en-GB": enGB } });

class DatesForm extends Component {
  constructor(props) {
    super(props);
    const { datesList } = props;
    // console.log("datesList=" + JSON.stringify(datesList, null, 4));
    this.state = {
      datesList: this.textDatesToFnsDates(datesList)
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(
    //   "date-form.js componentWillReceiveProps, nextProps=" +
    //     JSON.stringify(nextProps, null, 4)
    // );
    if (nextProps.datesList) {
      this.setState({
        datesList: this.textDatesToFnsDates(nextProps.datesList)
      });
    }
  }

  textDatesToFnsDates = textDateList =>
    textDateList.map(textDate => {
      const newDate = new Date(textDate);
      return newDate;
    });

  fnsDatesToISOText = dateList => {
    // console.log("fnsDatesToISOText, dateFnsFormat=" + dateFnsFormat);
    return dateList.map(dateMember => dateFnsFormat(dateMember, "YYYY-MM-DD"));
  };

  handleChange = fieldData => {
    // console.log("fieldData = " + JSON.stringify(fieldData, null, 4));
    const { datesList } = this.state;

    const newDatesList = [
      ...datesList.slice(0, fieldData.fieldNo),
      new Date(fieldData.value),
      ...datesList.slice(fieldData.fieldNo + 1)
    ];
    this.setState({ datesList: newDatesList });
  };

  handleSubmit = e => {
    const { notifyInfo, submitDataToServer } = this.props;
    e.preventDefault();
    const values = this.fnsDatesToISOText(this.state.datesList);
    // console.log(
    //   "submitting dates to server = " + JSON.stringify(values, null, 2)
    // );
    notifyInfo("Submitting dates data to server...");
    submitDataToServer(values);
    // actions.setSubmitting(false);
  };

  getDateFields = datesList => {
    console.log("getDateFields");
    let x = -1;
    let keyName = "";
    datesList.map(theDate => {
      console.log("x = " + x);
      x++;
      keyName = `date${x}`;
      return (
        <FormGroup key={keyName}>
          <Label for={keyName}>Day {x + 1}</Label>
          <DateTimePicker
            name={keyName}
            format={dateFormatString}
            time={false}
            onChange={value => this.handleChange({ value, fieldNo: x })}
            defaultValue={this.state.datesList[x]}
            value={this.state.datesList[x]}
          />
        </FormGroup>
      );
    });
  };

  render() {
    const {
      datesList,
      isEditExisting,
      isLoggedIn,
      match,
      notifyInfo,
      submitDataToServer,
      fetchStatus,
      fetchError,
      saveStatus,
      saveError
    } = this.props;

    // let fieldValues = { dayOne: "", dayTwo: "", dayThree: "" };
    return (
      <div>
        {!isLoggedIn && <NotLoggedInWarning />}
        <h1>Helstonbury Dates</h1>
        <div style={{ maxWidth: 180 }}>
          <LoadStatusIndicator
            fetchStatus={fetchStatus}
            fetchError={fetchError}
          />
          <SaveStatusIndicator saveStatus={saveStatus} saveError={saveError} />

          <form onSubmit={this.handleSubmit}>
            {this.getDateFields(datesList)}

            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
    );
  }
}

DatesForm.propTypes = {
  datesList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  errors: PropTypes.object,
  fetchError: PropTypes.string.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  isEditExisting: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  match: PropTypes.object,
  notifyInfo: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  saveStatus: PropTypes.string,
  saveError: PropTypes.string,
  submitDataToServer: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default DatesForm;
