// Render Prop
import React from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";
// import dateFnsLocalizer from "react-widgets-date-fns";
// import enGB from "date-fns/locale/en-GB";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { format as dateFnsFormat } from "date-fns";
import SelectList from "react-widgets/lib/SelectList";
import "react-widgets/dist/css/react-widgets.css";
import { dateFormatString, timeFormatString } from "../constants/formats.js";

// dateFnsLocalizer({ "en-GB": enGB });

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

const renderSelectDates = datesList =>
  datesList.map(dateMember => ({
    valueField: dateMember,
    textField: dateFnsFormat(dateMember, dateFormatString)
  }));

const AppearanceForm = ({
  datesList,
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
    <div style={{ maxWidth: 320, marginBottom: 50 }}>
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
                <Label for="dateTimeStart">Day</Label>
                <SelectList
                  data={renderSelectDates(datesList)}
                  textField="textField"
                  valueField="valueField"
                />
                {errors.dateTimeStart && <div>{errors.dateTimeStart}</div>}
              </FormGroup>
              <FormGroup>
                <Label for="timeStart">Start time</Label>
                <DateTimePicker
                  name="timeStart"
                  culture="en-GB"
                  format={timeFormatString}
                  defaultValue={new Date()}
                  date={false}
                />
              </FormGroup>
              <FormGroup>
                <Label for="timeEnd">End Time</Label>
                <DateTimePicker
                  name="timeEnd"
                  culture="en-GB"
                  format={timeFormatString}
                  defaultValue={new Date()}
                  date={false}
                />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </form>
          );
        }}
      />
    </div>
  );
};


/*
See Formik doc plus https://github.com/jaredpalmer/formik/issues/86
export const MyReactNativeForm = props => (
  <View>
    <TextInput
      onChangeText={text => props.setFieldValue('email', text)}
      value={props.values.email}
    />
    <Button onPress={props.handleSubmit} />
  </View>
);
 */
export const MyReactNativeForm = props => (
  <View>
    <TextInput
      onChangeText={text => props.setFieldValue('email', text)}
      value={props.values.email}
    />
    <Button onPress={props.handleSubmit} />
  </View>
);
 */

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
