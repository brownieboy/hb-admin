// Render Prop
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label } from "reactstrap";
import { format as dateFnsFormat } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import dateFnsLocalizer, { defaultFormats } from "react-widgets-date-fns";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import { dateFormatString } from "../constants/formats.js";

// const formats = Object.assign(defaultFormats, { default: "DD/MM/YYYY" });
// dateFnsLocalizer(formats, { "en-GB": enGB });
dateFnsLocalizer({ "en-GB": enGB });

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
    console.log("fieldData = " + JSON.stringify(fieldData, null, 4));
    const { datesList } = this.state;

    const newDatesList = [
      ...datesList.slice(0, fieldData.fieldNo),
      new Date(fieldData.value),
      ...datesList.slice(fieldData.fieldNo + 1)
    ];
    this.setState({ datesList: newDatesList });
  };

  handleSubmit = e => {
    const { submitDataToServer } = this.props;
    e.preventDefault();
    const values = this.fnsDatesToISOText(this.state.datesList);
    console.log(
      "submitting dates to server = " + JSON.stringify(values, null, 2)
    );
    submitDataToServer(values);
    // actions.setSubmitting(false);
  };

  render() {
    const {
      datesList,
      isEditExisting,
      match,
      submitDataToServer,
      saveStatus,
      saveError
    } = this.props;

    let fieldValues = { dayOne: "", dayTwo: "", dayThree: "" };
    return (
      <div style={{ maxWidth: 180 }}>
        <h1>Add Dates</h1>
        Loading status: {saveStatus}
        {saveStatus === "saving" && (
          <i className="fa fa-refresh fa-spin" style={{ fontSize: "24px" }} />
        )}
        <br />
        {saveStatus === "failure" &&
          `Error: ${JSON.stringify(saveError, null, 4)}`}
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="dateOne">Day 1</Label>
            <DateTimePicker
              name="dateOne"
              format={dateFormatString}
              time={false}
              onChange={value => this.handleChange({ value, fieldNo: 0 })}
              defaultValue={this.state.datesList[0]}
              value={this.state.datesList[0]}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateTwo">Day 2</Label>
            <DateTimePicker
              name="dateTwo"
              format={dateFormatString}
              time={false}
              onChange={value => this.handleChange({ value, fieldNo: 1 })}
              value={this.state.datesList[1]}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateThree">Day 3</Label>
            <DateTimePicker
              name="dateThree"
              format={dateFormatString}
              time={false}
              onChange={value => this.handleChange({ value, fieldNo: 2 })}
              value={this.state.datesList[2]}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

DatesForm.propTypes = {
  datesList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  errors: PropTypes.object,
  isEditExisting: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  match: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  saveStatus: PropTypes.string,
  saveError: PropTypes.object,
  submitDataToServer: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default DatesForm;
