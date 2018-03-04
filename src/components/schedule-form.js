// Render Prop
import React from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";
// import Moment from "moment";
// import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";

// Moment.locale("en");
// momentLocalizer();

const validationSchemaCommonObj = {
  bandId: yup.string().required(),
  stageId: yup.string().required(),
  dateTimeStart: yup.string().required()
};

const renderOptionsField = dataArray =>
  dataArray.map(dataMember => (
    <option key={dataMember.id} value={dataMember.id}>
      {dataMember.name}
    </option>
  ));

const AppearanceForm = ({
  getAppearanceInfoForId,
  isEditExisting,
  match,
  submitDataToServer,
  bandsPicker,
  stagesPicker,
  saveStatus,
  saveError
}) => {
  let fieldValues = { bandId: "", stageId: "" };
  const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
  // console.log("bandsPicker=" + JSON.stringify(bandsPicker, null, 4));
  if (isEditExisting) {
    // const matchingInfo = getAppearanceInfoForId(match.params.id);
    // if (matchingInfo) {
    //   fieldValues = Object.assign({}, matchingInfo);
    // }
  } else {
    // validationSchemaObj.id = yup
    //   .string()
    //   .required()
  }
  return (
    <div>
      <h1>Add Appearance</h1>
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

          /*
      "dateTimeEnd": "2018-07-21T21:30",
      "dateTimeStart": "2018-07-21T20:30",
      "stageId": "main",
      "stageName": "Main Stage",
      "stageSortOrder": 10,
      "bandId": "acdc",
      "name": "AC/DC"
 */

          return (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="bandId">Band</Label>
                <Input
                  type="select"
                  name="bandId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bandId}
                >
                  <option />
                  {renderOptionsField(bandsPicker)}
                </Input>
                {errors.bandId && <div>{errors.bandId}</div>}
              </FormGroup>
              <FormGroup>
                <Label for="stageId">Stage</Label>
                <Input
                  type="select"
                  name="stageId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                >
                  <option />
                  {renderOptionsField(stagesPicker)}
                </Input>
                {errors.stageId && <div>{errors.stageId}</div>}
              </FormGroup>
              <FormGroup>
                <Label for="dateTimeStart">Start time</Label>
                <Input
                  type="date"
                  name="dateTimeStart"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.dateTimeStart && <div>{errors.dateTimeStart}</div>}
              </FormGroup>

              <FormGroup>
                <Label for="timeStart">Start time</Label>
                <DateTimePicker defaultValue={new Date()} />
              </FormGroup>

              <Button type="submit">Submit</Button>
            </form>
          );
        }}
      />
    </div>
  );
};

AppearanceForm.propTypes = {
  errors: PropTypes.object,
  getAppearanceInfoForId: PropTypes.func,
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

export default AppearanceForm;
