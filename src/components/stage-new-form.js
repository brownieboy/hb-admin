// Render Prop
import React from "react";
import { Formik, Field } from "formik";
import yup from "yup";
import PropTypes from "prop-types";

export const validationSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  sortOrder: yup
    .number()
    .required()
    .positive()
    .integer()
});

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

const StageNewForm = ({ submitDataToServer }) => {
  const defaultFieldValues = { name: "", id: "", sortOrder: -1 };

  return (
    <div>
      <h1>My Form</h1>
      <Formik
        enableReinitialize
        initialValues={Object.assign({}, defaultFieldValues)}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values, null, 2));
          saveNewStageProp(values);
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
  saveNewStageProp: PropTypes.func.isRequired,
  match: PropTypes.object,
  getStageInfoForId: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object
};

CommonStageFields.propTypes = {
  errors: PropTypes.object
};

export default StageNewForm;
