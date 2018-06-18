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
    console.log("constructor datesList");
    console.log(datesList);
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

  /*
(function(key) {
    db.setValue(
        function() {
            console.log("OK: store a value of " + key);
        },
        function() {
            throw "ERR: can't store a value of " + key;
        },
        databaseName,
        key,
        _list[i]
    );
})(key)
 */

  getDateField = (dateValue, fieldNo) => {
    const keyName = `date${fieldNo}`;
    return (
      <FormGroup key={keyName}>
        <Label for={keyName}>Day {fieldNo + 1}</Label>
        <DateTimePicker
          name={keyName}
          format={dateFormatString}
          time={false}
          onChange={value => this.handleChange({ value, fieldNo })}
          value={dateValue}
        />
      </FormGroup>
    );
  };

  getDateFields = datesList => {
    console.log("getDateFields, datesList:");
    console.log(datesList);
    let x = -1;
    return datesList.map(theDate => {
      x++;
      return this.getDateField(theDate, x);
    });
  };

  render() {
    const {
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

    const { datesList } = this.state;

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
        <Button
          onClick={() => {
            const newDates = [...datesList, new Date()];
            console.log("newDates");
            console.log(newDates);
            this.setState({ datesList: newDates });
          }}
        >
          Add new date
        </Button>
      </div>
    );
  }
}

DatesForm.propTypes = {
  datesList: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  ).isRequired,
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
