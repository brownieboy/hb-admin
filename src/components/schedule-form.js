// Render Prop
import React from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";
import dateFnsLocalizer from "react-widgets-date-fns";
import enGB from "date-fns/locale/en-GB";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { format as dateFnsFormat } from "date-fns";
import shortId from "shortid";
import SelectList from "react-widgets/lib/SelectList";
import "react-widgets/dist/css/react-widgets.css";
import { dateFormatString, timeFormatString } from "../constants/formats.js";

dateFnsLocalizer({ "en-GB": enGB });

const validationSchemaCommonObj = {
  bandId: yup.string().required(),
  stageId: yup.string().required(),
  dateDay: yup.string().required(),
  timeStart: yup.date().required(),
  timeEnd: yup.date().required()
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
    console.log("schedule form edit mode, id=" + match.params.id);
    const matchingInfo = getAppearanceInfoForId(match.params.id);
    console.log(
      "schedule form edit mode, matchingInfo=" +
        JSON.stringify(matchingInfo, null, 2)
    );

    if (matchingInfo) {
      console.log("matchingInfo.dateTimeStart=" + matchingInfo.dateTimeStart);
      console.log("matchingInfo.dateTimeEnd=" + matchingInfo.dateTimeEnd);

      // incoming
      fieldValues = {
        bandId: matchingInfo.bandId,
        stageId: matchingInfo.stageId,
        dateDay: dateFnsFormat(matchingInfo.dateTimeStart, "YYYY-MM-DD"),
        id: matchingInfo.id
      };
      const timeStart = new Date(matchingInfo.dateTimeStart);
      const timeEnd = new Date(matchingInfo.dateTimeEnd);
      fieldValues.timeStartString = dateFnsFormat(timeStart, "HH:mm");
      fieldValues.timeEndString = dateFnsFormat(timeEnd, "HH:mm");
      console.log("timeStart=" + timeStart);
      console.log("timeEnd=" + timeEnd);
      console.log("timeStart isNaN getTime = " + isNaN(timeStart.getTime()));
      console.log("timeEnd isNaN getTime =" + isNaN(timeEnd.getTime()));
      fieldValues.timeStart = isNaN(timeStart.getTime()) ? new Date() : timeStart;
      fieldValues.timeEnd = isNaN(timeEnd.getTime()) ? new Date() : timeEnd;
      console.log("Final fieldValues=" + JSON.stringify(fieldValues, null, 2));
    }
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
          console.log("onSubmit values=" + JSON.stringify(values, null, 2));
          // Outgoing
          const processedValues = {
            stageId: values.stageId,
            bandId: values.bandId,
            dateTimeStart: `${values.dateDay}T${values.timeStartString}`,
            dateTimeEnd: `${values.dateDay}T${values.timeEndString}`
          };

          // Add ID only if it's a new appearance.  Assume that we won't be
          // able to change the bandId when editing later.
          if (isEditExisting) {
            processedValues.id = values.id;
          } else {
            processedValues.id = `${
              processedValues.bandId
            }~${shortId.generate()}`;
          }
          console.log(
            "onSubmit processedValues=" +
              JSON.stringify(processedValues, null, 2)
          );

          submitDataToServer(processedValues);
          actions.setSubmitting(false);
        }}
        render={props => {
          const {
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          } = props;

          // console.log(
          //   "Appearances form, values=" + JSON.stringify(values, null, 2)
          // );
          return (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="bandId">Band</Label>
                <Input
                  type="select"
                  name="bandId"
                  disabled={isEditExisting}
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
                  value={values.stageId}
                >
                  <option />
                  {renderOptionsField(stagesPicker)}
                </Input>
                {errors.stageId && <div>{errors.stageId}</div>}
              </FormGroup>
              <FormGroup>
                <Label for="dateTimeStart">Day</Label>
                <SelectList
                  name="dateDay"
                  onChange={value => setFieldValue("dateDay", value.valueField)}
                  data={renderSelectDates(datesList)}
                  textField="textField"
                  valueField="valueField"
                  value={values.dateDay}
                />
                {errors.dateDay && <div>{errors.dateDay}</div>}
              </FormGroup>

              <FormGroup>
                <Label for="timeStart">Start Time</Label>
                <DateTimePicker
                  name="timeStart"
                  defaultValue={isEditExisting ? values.timeStart : new Date()}
                  date={false}
                  culture="en-GB"
                  format={timeFormatString}
                  step={15}
                  onChange={value => {
                    // console.log("onChange value = " + value);
                    // console.log(
                    //   "onChange string = " + dateFnsFormat(value, timeFormatString)
                    // );
                    setFieldValue("timeStart", value);
                    setFieldValue(
                      "timeStartString",
                      dateFnsFormat(value, timeFormatString)
                    );
                  }}
                  value={values.timeStart}
                />
                {errors.timeStart && <div>{errors.timeStart}</div>}
              </FormGroup>

              <FormGroup>
                <Label for="timeEnd">End Time</Label>
                <DateTimePicker
                  name="timeEnd"
                  defaultValue={isEditExisting ? values.timeStart : new Date()}
                  date={false}
                  culture="en-GB"
                  step={15}
                  format={timeFormatString}
                  onChange={value => {
                    // console.log("onChange value = " + value);
                    // console.log(
                    //   "onChange string = " + dateFnsFormat(value, timeFormatString)
                    // );
                    setFieldValue("timeEnd", value);
                    setFieldValue(
                      "timeEndString",
                      dateFnsFormat(value, timeFormatString)
                    );
                  }}
                  value={values.timeEnd}
                />
                {errors.timeEnd && <div>{errors.timeEnd}</div>}
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

From the react-widgets sample code in its www folder.  Can probably use dateFnsFormat instead though.

function merge(date, time){
  if( time == null && date == null)
    return null

  if( time == null) time = new Date
  if( date == null) date = new Date

  date = dates.startOf(date, 'day')
  date = dates.hours(date,        dates.hours(time))
  date = dates.minutes(date,      dates.minutes(time))
  date = dates.seconds(date,      dates.seconds(time))
  return dates.milliseconds(date, dates.milliseconds(time))
}



              <FormGroup>
                <Label for="timeStart">Start time</Label>
                <DateTimePicker
                  name="timeStart"
                  culture="en-GB"
                  defaultValue={new Date()}
                  date={false}
                  step={5}
                  onChange={value => {
                    console.log("onChange value = " + value);
                    setFieldValue("timeStart", value);
                  }}
                  onBlur={value => setFieldValue("timeStart", value)}
                />
              </FormGroup>


                  onChange={value => setFieldValue("timeEnd", value)}
                  onBlur={value => setFieldValue("timeEnd", value)}

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
/*
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
  setFieldValue: PropTypes.func,
  submitDataToServer: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default AppearanceForm;
