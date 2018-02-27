// Render Prop
import React, { Component } from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";

const validationSchemaCommonObj = {
  id: yup.string().required(),
  name: yup.string().required(),
  sortOrder: yup
    .number()
    .required()
    .positive()
    .integer()
};

export const CommonStageFields = props => {
  const { values, errors, handleChange, handleBlur } = props;
  return (
    <div>
      <FormGroup>
        <Label for="name">Stage name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Stage name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && <div>{errors.name}</div>}
      </FormGroup>

      <FormGroup>
        <Label for="sortOrder">Sort order</Label>
        <Input
          type="number"
          name="sortOrder"
          placeholder="Sort order common (integer)"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.sortOrder}
        />
        {errors.sortOrder && <div>{errors.sortOrder}</div>}
      </FormGroup>
    </div>
  );
};

CommonStageFields.propTypes = {
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object
};

export const StageNewForm = ({ submitDataToServer }) => {
  const defaultFieldValues = { name: "", id: "", sortOrder: -1 };
  const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
  validationSchemaObj.id = yup.string().required();
  return (
    <div>
      <h1>Add Stage</h1>
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
                <Label for="id">Stage ID</Label>
                <Input
                  type="text"
                  name="id"
                  placeholder="ID must be unique"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id}
                />
                {errors.id && <div>{errors.id}</div>}
              </FormGroup>
              <CommonStageFields {...props} />
              <Button type="submit">Submit</Button>
            </form>
          );
        }}
      />
    </div>
  );
};

StageNewForm.propTypes = {
  submitDataToServer: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object
};

export class StageEditForm extends Component {
  render() {
    const { submitDataToServer, match, getStageInfoForId } = this.props;

    let fieldValues = { name: "", id: "", sortOrder: -1 };
    if (match && match.params && match.params.id) {
      const matchingInfo = getStageInfoForId(match.params.id);
      if (matchingInfo) {
        console.log("matchingInfo=" + JSON.stringify(matchingInfo, null, 4));
        fieldValues = Object.assign({}, matchingInfo);
      }
    }

    return (
      <div>
        <h1>Edit Stage</h1>
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
                <Label for="id">Stage ID</Label>
                <Input
                  type="text"
                  name="id"
                  value={props.values.id}
                />
              </FormGroup>
              <CommonStageFields {...props} />
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

StageEditForm.propTypes = {
  submitDataToServer: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  match: PropTypes.object,
  getStageInfoForId: PropTypes.func.isRequired
};
