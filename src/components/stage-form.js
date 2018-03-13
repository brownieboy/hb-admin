// Render Prop
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";

const validationSchemaCommonObj = {
  name: yup.string().required(),
  sortOrder: yup
    .number()
    .required()
    .positive()
    .integer()
};

class StageForm extends Component {
  classId = "";

  componentWillUnmount() {
    console.log("Clearing from componentWillUnmount");
    this.props.saveStageClear && this.props.saveStageClear(); // Clear saveSuccess status so we don't loop
  }

  render() {
    const {
      getStageInfoForId,
      isEditExisting,
      match,
      submitDataToServer,
      saveStatus,
      saveError
    } = this.props;
    let fieldValues = { name: "", id: "", sortOrder: -1 };
    const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
    if (isEditExisting) {
      const matchingInfo = getStageInfoForId(match.params.id);

      if (matchingInfo) {
        fieldValues = Object.assign({}, matchingInfo);
      }
    } else {
      validationSchemaObj.id = yup
        .string()
        .required()
        .test(
          "id",
          "There is already a stage with the same id",
          id => !getStageInfoForId(id)
        );
    }

    const isRedirectOn = !isEditExisting && saveStatus === "success";

    return isRedirectOn ? (
      <Redirect to={`/stageform/${this.classId}`} />
    ) : (
      <div>
        <h1>Add Stage</h1>
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
                  <Label for="id">Stage ID</Label>
                  <Input
                    disabled={isEditExisting}
                    type="text"
                    name="id"
                    placeholder="ID must be unique"
                    onChange={e => {
                      handleChange(e);
                      this.classId = e.target.value;
                    }}
                    onBlur={handleBlur}
                    value={values.id}
                  />
                  {errors.id && <div>{errors.id}</div>}
                </FormGroup>
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
                <Button type="submit">Submit</Button>
              </form>
            );
          }}
        />
      </div>
    );
  }
}

StageForm.propTypes = {
  errors: PropTypes.object,
  getStageInfoForId: PropTypes.func.isRequired,
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

export default StageForm;
