// Render Prop
import React from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";

const validationSchemaCommonObj = {
  bandId: yup.string().required(),
  stageId: yup.string().required()
};

const AppearanceForm = ({
  getAppearanceInfoForId,
  isEditExisting,
  match,
  submitDataToServer,
  saveStatus,
  saveError
}) => {
  let fieldValues = { name: "", id: "", summary: "" };
  const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
  if (isEditExisting) {
    const matchingInfo = getAppearanceInfoForId(match.params.id);
    if (matchingInfo) {
      fieldValues = Object.assign({}, matchingInfo);
    }
  } else {
    validationSchemaObj.id = yup
      .string()
      .required()
      .test("id", "There is already a band with the same id", id => !getAppearanceInfoForId(id));
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
                  type="text"
                  name="bandId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bandId}
                />
                {errors.bandId && <div>{errors.bandId}</div>}
              </FormGroup>
              <FormGroup>
                <Label for="stageId">Stage</Label>
                <Input
                  type="text"
                  name="stageId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.stageId && <div>{errors.stageId}</div>}
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
