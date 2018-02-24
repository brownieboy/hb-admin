// Render Prop
import React from "react";
import { Formik, Field } from "formik";

const StageForm = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ name: "", id: "", sortOrder: -1 }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 200);
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <Field
            type="text"
            name="id"
            placeholder="Stage id (must be unique, no spaces)"
          />

          <br />
          <Field type="text" name="name" placeholder="Stage name" />
          <br />
          <Field
            type="number"
            name="sortOrder"
            placeholder="Sort order (integer)"
          />

          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit">Submit</button>
        </form>
      )}
    />
  </div>
);

export default StageForm;
