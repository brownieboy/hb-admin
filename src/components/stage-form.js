// Render Prop
import React from "react";
import { Formik, Field } from "formik";
import yup from "yup";

const StageForm = ({ saveNewStageProp, match }) => {
  const isExisting = match && match.params && match.params.id ? true : false;
  if (isExisting) {
    console.log("Edit existing stage " + match.params.id);
  } else {
    console.log("Creating new stage");
  }
  const fieldValues = { name: "", id: "", sortOrder: -1 };

  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={Object.assign({}, fieldValues)}
        validationSchema={yup.object().shape({
          id: yup.string().required(),
          name: yup.string().required(),
          sortOrder: yup
            .number()
            .required()
            .positive()
            .integer()
        })}
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
            <Field type="text" name="name" placeholder="Stage name" />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}

            <br />
            <Field
              type="number"
              name="sortOrder"
              placeholder="Sort order (integer)"
            />
            {props.errors.sortOrder && (
              <div id="feedback">{props.errors.sortOrder}</div>
            )}

            <button type="submit">Submit</button>
          </form>
        )}
      />
    </div>
  );
};

export default StageForm;
