// Render Prop
import React, { Component } from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";

moment.locale("en-gb");
momentLocalizer();

const validationSchemaCommonObj = {
  // dayOne: yup.string().required(),
  // dayTwo: yup.string().required(),
  // dayThree: yup.string().required()
};

// const stripTimeFrom

class DatesForm extends Component {
  constructor(props) {
    super(props);
    const { datesList } = props;
    // console.log("datesList=" + JSON.stringify(datesList, null, 4));
    this.state = {
      datesList: this.textDatesToMomentDates(datesList)
    };
  }

  textDatesToMomentDates = textDateList =>
    textDateList.map(textDate => {
      const newDateM = moment(textDate);
      return newDateM.isValid() ? newDateM : moment(new Date());
    });

  handleChange = fieldData => {
    console.log("fieldData = " + JSON.stringify(fieldData, null, 4));
    const { datesList } = this.state;

    const newDatesList = [
      ...datesList.slice(0, fieldData.fieldNo),
      moment(fieldData.value),
      ...datesList.slice(fieldData.fieldNo + 1)
    ];
    this.setState({ datesList: newDatesList });
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
    const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
    return (
      <div>
        <h1>Add Dates</h1>
        Loading status: {saveStatus}
        {saveStatus === "saving" && (
          <i className="fa fa-refresh fa-spin" style={{ fontSize: "24px" }} />
        )}
        <br />
        {saveStatus === "failure" &&
          `Error: ${JSON.stringify(saveError, null, 4)}`}
        <Formik
          enableReinitialize
          initialValues={Object.assign({}, fieldValues)}
          validationSchema={yup.object().shape(validationSchemaObj)}
          onSubmit={(values, actions) => {
            console.log(JSON.stringify(values, null, 2));
            submitDataToServer(values);
            actions.setSubmitting(false);
          }}
          render={props => {
            const {
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="dateOne">Day 1</Label>
                  <DateTimePicker
                    name="dateOne"
                    time={false}
                    onChange={value => this.handleChange({ value, fieldNo: 0 })}
                    defaultValue={new Date()}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="dateTwo">Day 2</Label>
                  <DateTimePicker
                    name="dateTwo"
                    time={false}
                    onChange={value => this.handleChange({ value, fieldNo: 1 })}
                    defaultValue={new Date()}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="dateThree">Day 3</Label>
                  <DateTimePicker
                    name="dateThree"
                    time={false}
                    onChange={value => this.handleChange({ value, fieldNo: 2 })}
                    defaultValue={new Date()}
                  />
                </FormGroup>
                <Button type="submit">Submit</Button>
              </form>
            );
          }}
        />
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
