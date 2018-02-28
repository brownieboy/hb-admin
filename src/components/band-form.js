// Render Prop
import React, { Component } from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";

const validationSchemaCommonObj = {
  bandId: yup.string().required(),
  name: yup.string().required(),
  summary: yup.string().required(),
};

export const CommonBandFields = props => {
  const { values, errors, handleChange, handleBlur } = props;
  return (
    <div>
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
    </div>
  );
};

CommonBandFields.propTypes = {
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object
};

export const BandNewForm = ({ submitDataToServer, saveStatus, saveError }) => {
  const defaultFieldValues = { name: "", bandId: "", summary: "" };
  const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
  validationSchemaObj.id = yup.string().required();
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
        initialValues={Object.assign({}, defaultFieldValues)}
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
                <Label for="bandId">Band ID</Label>
                <Input
                  type="text"
                  name="bandId"
                  placeholder="ID must be unique"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bandId}
                />
                {errors.bandId && <div>{errors.bandId}</div>}
              </FormGroup>
              <CommonBandFields {...props} />
              <Button type="submit">Submit</Button>
            </form>
          );
        }}
      />
    </div>
  );
};

BandNewForm.propTypes = {
  submitDataToServer: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object
};

export class BandEditForm extends Component {
  render() {
    const { submitDataToServer, match, getBandInfoForId } = this.props;

    let fieldValues = { name: "", id: "", summary: -1 };
    if (match && match.params && match.params.id) {
      const matchingInfo = getBandInfoForId(match.params.id);
      if (matchingInfo) {
        console.log("matchingInfo=" + JSON.stringify(matchingInfo, null, 4));
        fieldValues = Object.assign({}, matchingInfo);
      }
    }

    return (
      <div>
        <h1>Edit Band</h1>
        <Formik
          enableReinitialize
          initialValues={Object.assign({}, fieldValues)}
          validationSchema={yup.object().shape(validationSchemaCommonObj)}
          onSubmit={(values, actions) => {
            console.log(
              "Submitting to server, " + JSON.stringify(values, null, 2)
            );
            submitDataToServer(values);
            actions.setSubmitting(false);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <FormGroup>
                <Label for="id">Band ID</Label>
                <Input disabled type="text" name="id" value={props.values.id} />
              </FormGroup>
              <CommonBandFields {...props} />
              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

BandEditForm.propTypes = {
  submitDataToServer: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  match: PropTypes.object,
  getBandInfoForId: PropTypes.func.isRequired
};
