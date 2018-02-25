// Render Prop
import React from "react";
import { Formik, Field } from "formik";
import yup from "yup";
import PropTypes from "prop-types";

const validationSchemaCommonObj = {
  id: yup.string().required(),
  name: yup.string().required(),
  sortOrder: yup
    .number()
    .required()
    .positive()
    .integer()
};

export const CommonStageFields = ({ errors }) => (
  <div>
    <Field type="text" name="name" placeholder="Stage name" />
    {errors.name && <div id="feedback">{errors.name}</div>}

    <br />
    <Field
      type="number"
      name="sortOrder"
      placeholder="Sort order common (integer)"
    />
    {errors.sortOrder && <div id="feedback">{errors.sortOrder}</div>}

    <button type="submit">Submit</button>
  </div>
);

CommonStageFields.propTypes = {
  errors: PropTypes.object
};

export const StageNewForm = ({ submitDataToServer }) => {
  const defaultFieldValues = { name: "", id: "", sortOrder: -1 };
  const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
  validationSchemaObj.id = yup.string().required();
  return (
    <div>
      <h1>My Form</h1>
      <Formik
        enableReinitialize
        initialValues={Object.assign({}, defaultFieldValues)}
        validationSchema={yup.object().shape(validationSchemaObj)}
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values, null, 2));
          submitDataToServer(values);
          actions.setSubmitting(false);
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <Field
              type="text"
              name="id"
              placeholder="Stage id (must be unique, no spaces)"
            />
            {props.errors.id && <div id="feedback">{props.errors.id}</div>}
            <br />
            <CommonStageFields {...props} />
          </form>
        )}
      />
    </div>
  );
};

StageNewForm.propTypes = {
  submitDataToServer: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object
};

export const StageEditForm = ({
  submitDataToServer,
  match,
  getStageInfoForId
}) => {
  let fieldValues = { name: "", id: "", sortOrder: -1 };
  if (match && match.params && match.params.id) {
    console.log("Calling getStageInfoForId from StageEditForm");
    const matchingInfo = getStageInfoForId(match.params.id);
    console.log("Matching info = " + JSON.stringify(matchingInfo));

    if (matchingInfo) {
      fieldValues = Object.assign({}, matchingInfo);
    }
  }

  return (
    <div>
      <h1>My Form</h1>
      <Formik
        enableReinitialize
        initialValues={Object.assign({}, fieldValues)}
        validationSchema={yup.object().shape(validationSchemaCommonObj)}
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values, null, 2));
          console.log("submitting to server...");
          submitDataToServer(values);
          actions.setSubmitting(false);
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <Field
              type="text"
              name="id"
              disabled
              placeholder="Stage id (must be unique, no spaces)"
            />
            <br />
            <CommonStageFields {...props} />
          </form>
        )}
      />
    </div>
  );
};

StageEditForm.propTypes = {
  submitDataToServer: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  match: PropTypes.object,
  getStageInfoForId: PropTypes.func.isRequired
};
