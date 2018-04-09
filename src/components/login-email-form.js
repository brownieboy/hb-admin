// Render Prop
import React from "react";
import PropTypes from "prop-types";
import yup from "yup";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Formik } from "formik";

import NotLoggedInWarning from "../components/not-logged-in-warning.js";
import {
  formFieldsWrapperStyles,
  helpInfoTextStyles,
  blurbFieldRows
} from "./formstyles.js";

const LoginEmailForm = ({ isLoggedIn, loginProp, logoutProp }) => {
  const fieldValues = { email: "", password: "" };
  // console.log("fieldValues:");
  // console.log(fieldValues);
  const validationSchemaObj = {
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  };

  return (
    <div>
      {!isLoggedIn && <NotLoggedInWarning />}
      <h1>Login</h1>
      <Formik
        enableReinitialize
        initialValues={Object.assign({}, fieldValues)}
        validationSchema={yup.object().shape(validationSchemaObj)}
        onSubmit={(values, actions) => {
          // console.log(JSON.stringify(values, null, 2));
          loginProp(values);
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
            <div style={formFieldsWrapperStyles}>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email address</Label>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && <div>{errors.email}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && <div>{errors.password}</div>}
                </FormGroup>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          );
        }}
      />
    </div>
  );
};

LoginEmailForm.propTypes = {
  errors: PropTypes.object,

  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  loginProp: PropTypes.func.isRequired,
  logoutProp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  values: PropTypes.object
};

export default LoginEmailForm;
