// Render Prop
import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input } from "reactstrap";
import NotLoggedInWarning from "../components/not-logged-in-warning.js";
import CardThumbImagesSubForm from "./cardthumbimages-subform.js";

import {
  formFieldsWrapperStyles,
  helpInfoTextStyles,
  blurbFieldRows
} from "./formstyles.js";

const validationSchemaCommonObj = {
  name: yup.string().required(),
  summary: yup.string(),
  sortOrder: yup
    .number()
    .required()
    .positive()
    .integer()
};

class StageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbFileInfo: {},
      cardFileInfo: {},
      cardPostFileName: ""
    };
  }

  classId = "";

  componentWillUnmount() {
    // console.log("Clearing from componentWillUnmount");
    if (this.props.saveStageClear) {
      this.props.saveStageClear();
    } // Clear saveSuccess status so we don't loop
  }

  handleThumbFileChange = event => {
    // console.log("handleThumbFileChange");
    // console.log(event.target.files[0]);
    this.setState({ thumbFileInfo: event.target.files[0] });
  };

  handleCardFileChange = event => {
    // console.log("handleThumbFileChange");
    // console.log(event.target.files[0]);
    this.setState({ cardFileInfo: event.target.files[0] });
  };

  render() {
    const {
      getStageInfoForId,
      isEditExisting,
      isLoggedIn,
      match,
      notifyInfo,
      submitDataToServer,
      saveStatus,
      saveError,
      sendStorageCardStart,
      sendStorageThumbStart,
      thumbProgress,
      cardProgress
    } = this.props;
    let fieldValues = {
      name: "",
      id: "",
      sortOrder: -1,
      summary: "",
      blurb: ""
    };
    const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
    let matchingInfo;
    if (isEditExisting) {
      matchingInfo = getStageInfoForId(match.params.id);

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
      <div style={formFieldsWrapperStyles}>
        {!isLoggedIn && <NotLoggedInWarning />}
        <h1>
          {isEditExisting
            ? `Edit ${matchingInfo ? matchingInfo.name : "??"}`
            : "Add Stage"}
        </h1>
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
            // console.log(JSON.stringify(values, null, 2));
            notifyInfo("Submitting stage data to server...");
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
            const { cardFileInfo, thumbFileInfo } = this.state;
            return (
              <Fragment>
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
                    <Label for="summary">Summary</Label>
                    <Input
                      type="text"
                      name="summary"
                      placeholder="One line summary, shown in app's Stage squares"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.summary}
                    />
                    {errors.summary && <div>{errors.summary}</div>}
                  </FormGroup>

                  <FormGroup>
                    <Label for="blurb">Stage Info</Label>
                    <Input
                      rows={blurbFieldRows}
                      type="textarea"
                      name="blurb"
                      placeholder="Info about this stage (location etc)"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.blurb}
                    />
                    {errors.blurb && <div>{errors.blurb}</div>}
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
                  <Button type="submit" color="primary">Save</Button>
                </form>
                <hr />
                <h2>Images</h2>
                <CardThumbImagesSubForm
                  cardFileInfo={cardFileInfo}
                  handleCardFileChange={this.handleCardFileChange}
                  handleThumbFileChange={this.handleThumbFileChange}
                  thumbFileInfo={thumbFileInfo}
                  sendStorageCardStart={sendStorageCardStart}
                  sendStorageThumbStart={sendStorageThumbStart}
                  thumbProgress={thumbProgress}
                  cardProgress={cardProgress}
                  isEditExisting={isEditExisting}
                  values={values}
                />
              </Fragment>
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
  isLoggedIn: PropTypes.bool.isRequired,
  isEditExisting: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  match: PropTypes.object,
  notifyInfo: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  saveStageClear: PropTypes.func,
  saveStatus: PropTypes.string,
  saveError: PropTypes.object,
  submitDataToServer: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default StageForm;
