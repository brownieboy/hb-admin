// Render Prop
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input, Progress } from "reactstrap";
// import { getId as getFacebookId } from "fb-id";
// import fbExtract from "extract-facebook-pageid";

/*
var Facebook = require('fb-id');
var facebook = new Facebook();

facebook.getId('https://www.facebook.com/mcnallydev?_rdr=p', function(id) {
  console.log(id);
});
*/

import NotLoggedInWarning from "../components/not-logged-in-warning.js";

import {
  formFieldsWrapperStyles,
  helpInfoTextStyles,
  blurbFieldRows
} from "./formstyles.js";

const validationSchemaCommonObj = {
  name: yup.string().required(),
  summary: yup.string().required(),
  facebookPageUrl: yup.string(),
  facebookId: yup.string().when("facebookPageUrl", {
    is: val => (val ? val !== "" : false),
    then: yup
      .string()
      .required(
        "If entering a Facebook page URL, you must also supply that page's ID"
      )
  }),
  facebookPageName: yup.string().when("facebookPageUrl", {
    is: val => (val ? val !== "" : false),
    then: yup
      .string()
      .required(
        "If entering a Facebook page URL, you must also supply that page's Name.  (Just put in the band's name otherwise.)"
      )
  })
};

const ThumbImage = urlData =>
  urlData.url ? (
    <img
      name="thumbnailImage"
      style={{ height: 100, width: 100 }}
      src={urlData.url}
    />
  ) : null;

const CardImage = urlData =>
  urlData.url ? (
    <img
      name="cardImage"
      style={{ height: 300, width: 400 }}
      src={urlData.url}
    />
  ) : null;

class BandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbFileInfo: {},
      cardFileInfo: {},
      cardPostFileName: ""
    };
  }

  classId = "";

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

  componentWillUnmount() {
    console.log("Clearing from componentWillUnmount");
    this.props.saveBandClear && this.props.saveBandClear(); // Clear saveSuccess status so we don't loop
  }

  render() {
    const {
      notifyInfo,
      getBandInfoForId,
      isEditExisting,
      isLoggedIn,
      match,
      submitDataToServer,
      saveStatus,
      sendStorageCardStart,
      sendStorageThumbStart,
      thumbProgress,
      cardProgress,
      saveBandClear
    } = this.props;

    let fieldValues = {
      name: "",
      id: "",
      summary: "",
      blurb: "",
      facebookPageUrl: "",
      facebookId: "",
      facebookPageName: ""
    };
    const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
    let matchingInfo;
    if (isEditExisting) {
      matchingInfo = getBandInfoForId(match.params.id);
      if (matchingInfo) {
        fieldValues = Object.assign({}, matchingInfo);
        // console.log("fieldValues:");
        // console.log(fieldValues);
      }
    } else {
      validationSchemaObj.id = yup
        .string()
        .required()
        .test(
          "id",
          "There is already a band with the same id",
          id => !getBandInfoForId(id)
        );
    }

    const isRedirectOn = !isEditExisting && saveStatus === "success";

    return isRedirectOn ? (
      <Redirect to={`/bandform/${this.classId}`} />
    ) : (
      <div style={formFieldsWrapperStyles}>
        {!isLoggedIn && <NotLoggedInWarning />}
        <h1>
          {isEditExisting
            ? `Edit ${matchingInfo ? matchingInfo.name : "??"}`
            : "Add Band"}
        </h1>
        <Formik
          enableReinitialize
          initialValues={Object.assign({}, fieldValues)}
          validationSchema={yup.object().shape(validationSchemaObj)}
          onSubmit={(values, actions) => {
            // console.log("onSubmit band values:");
            // console.log(values);
            notifyInfo("Submitting band data to server...");
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
              <div>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="id">Band ID</Label>
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

                  <FormGroup>
                    <Label for="blurb">Band Info</Label>
                    <Input
                      rows={blurbFieldRows}
                      type="textarea"
                      name="blurb"
                      placeholder="Info about the band/artist"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.blurb}
                    />
                    {errors.blurb && <div>{errors.blurb}</div>}
                  </FormGroup>

                  <FormGroup>
                    <Label for="facebookPageUrl">Facebook Page URL</Label>
                    <Input
                      type="text"
                      name="facebookPageUrl"
                      placeholder="URL for band's Facebook page"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.facebookPageUrl}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="facebookId">Facebook Page ID</Label>
                    <Input
                      type="text"
                      name="facebookId"
                      placeholder="ID for band's Facebook page"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.facebookId}
                    />
                    {errors.facebookId && <div>{errors.facebookId}</div>}
                    <span style={helpInfoTextStyles}>
                      To get the page ID, paste FB page URL in at{" "}
                      <a href="https://findmyfbid.com/" target="_blank">
                        https://findmyfbid.com/
                      </a>{" "}
                      or{" "}
                      <a href="https://lookup-id.com/" target="_blank">
                        https://lookup-id.com/
                      </a>
                    </span>
                  </FormGroup>

                  <FormGroup>
                    <Label for="facebookPageName">Facebook Page Name</Label>
                    <Input
                      type="text"
                      name="facebookPageName"
                      placeholder="Name for band's Facebook page"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.facebookPageName}
                    />
                    {errors.facebookPageName && (
                      <div>{errors.facebookPageName}</div>
                    )}
                  </FormGroup>

                  <Button type="submit">Submit</Button>
                </form>
                <hr />
                <h2>Images</h2>
                {!isEditExisting && (
                  <div>
                    You must save this form at least once before you can add
                    images.
                  </div>
                )}
                <div name="imagesWrapper" style={{ marginBottom: 100 }}>
                  <div
                    name="thumbImagesWrapper"
                    style={{ display: "flex", marginBottom: 30 }}
                  >
                    <div name="imagesLeftWrapper">
                      <Label for="thumbInput">Thumbnail image:</Label>
                      <div>
                        <input
                          type="file"
                          disabled={!isEditExisting}
                          name="thumbInput"
                          onChange={this.handleThumbFileChange}
                        />
                      </div>
                      <button
                        disabled={!this.state.thumbFileInfo.name}
                        onClick={() => {
                          sendStorageThumbStart({
                            bandId: values.id,
                            fileInfo: this.state.thumbFileInfo
                          });
                        }}
                      >
                        Upload thumbnail
                      </button>
                      <div
                        style={{
                          maxWidth: 200,
                          display: this.state.thumbFileInfo.name
                            ? "block"
                            : "none"
                        }}
                      >
                        <div className="text-center">
                          {parseInt(thumbProgress, 10)}%
                        </div>
                        <Progress
                          name="thumbProgressBar"
                          value={thumbProgress}
                          color={thumbProgress === 100 ? "success" : "info"}
                        />
                      </div>
                    </div>
                    <div name="imagesRightWrapper">
                      <ThumbImage url={values.thumbFullUrl} />
                    </div>
                  </div>
                  <div name="cardImagesWrapper" style={{ display: "flex" }}>
                    <div name="imagesLeftWrapper">
                      <Label for="cardInput">Card image:</Label>
                      <div>
                        <input
                          type="file"
                          disabled={!isEditExisting}
                          name="cardInput"
                          onChange={this.handleCardFileChange}
                        />
                      </div>
                      <button
                        disabled={!this.state.cardFileInfo.name}
                        onClick={() => {
                          sendStorageCardStart({
                            bandId: values.id,
                            fileInfo: this.state.cardFileInfo
                          });
                        }}
                      >
                        Upload card
                      </button>
                      <div
                        style={{
                          maxWidth: 200,
                          display: this.state.cardFileInfo.name
                            ? "block"
                            : "none"
                        }}
                      >
                        <div className="text-center">
                          {parseInt(cardProgress, 10)}%
                        </div>
                        <Progress
                          name="cardProgressBar"
                          value={cardProgress}
                          color={cardProgress === 100 ? "success" : "info"}
                        />
                      </div>
                    </div>
                    <div name="imagesRightWrapper">
                      <CardImage url={values.cardFullUrl} style />
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

/*
https://findmyfbid.com/, https://findmyfbid.com/ 
*/

BandForm.propTypes = {
  cardProgress: PropTypes.number,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired, // from react-router
  getBandInfoForId: PropTypes.func.isRequired,
  isEditExisting: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  match: PropTypes.object,
  notifyInfo: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  saveStatus: PropTypes.string,
  saveError: PropTypes.object,
  sendStorageCardStart: PropTypes.func,
  sendStorageThumbStart: PropTypes.func,
  thumbProgress: PropTypes.number,
  submitDataToServer: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default BandForm;
