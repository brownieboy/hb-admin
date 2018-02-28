// Render Prop
import React from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";

const validationSchemaCommonObj = {
  name: yup.string().required(),
  summary: yup.string().required()
};

const BandForm = ({
  getBandInfoForId,
  isEditExisting,
  match,
  submitDataToServer,
  saveStatus,
  saveError
}) => {
  let fieldValues = { name: "", id: "", summary: "" };
  const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
  if (isEditExisting) {
    const matchingInfo = getBandInfoForId(match.params.id);
    if (matchingInfo) {
      fieldValues = Object.assign({}, matchingInfo);
    }
  } else {
    validationSchemaObj.id = yup
      .string()
      .required()
      .test("id", "id not unique", id => !getBandInfoForId(id));
  }
  return (
    <div>
      <h1>Add Band</h1>
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
                <Label for="id">Band ID</Label>
                <Input
                  disabled={isEditExisting}
                  type="text"
                  name="id"
                  placeholder="ID must be unique"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id}
                />
                {errors.id && <div>{errors.id}</div>}
              </FormGroup>
              <FormGroup>
                <Label for="name">Band name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Band name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && <div>{errors.name}</div>}
              </FormGroup>

              <FormGroup>
                <Label for="summary">Summary</Label>
                <Input
                  type="text"
                  name="summary"
                  placeholder="One line summary, shown in app's bands list"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.summary}
                />
                {errors.summary && <div>{errors.summary}</div>}
              </FormGroup>
              <Button type="submit">Submit</Button>
            </form>
          );
        }}
      />
    </div>
  );
};

BandForm.propTypes = {
  errors: PropTypes.object,
  getBandInfoForId: PropTypes.func.isRequired,
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

export default BandForm;
