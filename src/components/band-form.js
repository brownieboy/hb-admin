// Render Prop
import React, { Component } from "react";
import { Formik } from "formik";
import yup from "yup";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input, Progress } from "reactstrap";

const validationSchemaCommonObj = {
  name: yup.string().required(),
  summary: yup.string().required()
};

const ThumbImage = urlData =>
  urlData.url ? (
    <img
      name="thumbnailImage"
      style={{ height: 100, width: 100 }}
      src={urlData.url}
    />
  ) : null;

class BandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbFileInfo: {},
      cardPostFileName: ""
    };
  }

  handleThumbFileChange = event => {
    // console.log("handleThumbFileChange");
    // console.log(event.target.files[0]);
    this.setState({ thumbFileInfo: event.target.files[0] });
  };

  render() {
    const {
      getBandInfoForId,
      isEditExisting,
      match,
      submitDataToServer,
      saveStatus,
      saveError,
      sendStorageThumbStart,
      thumbProgress
    } = this.props;
    let fieldValues = { name: "", id: "", summary: "" };
    const validationSchemaObj = Object.assign({}, validationSchemaCommonObj);
    if (isEditExisting) {
      const matchingInfo = getBandInfoForId(match.params.id);
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
              <div>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="id">Band ID</Label>
                    <Input
                      disabled={isEditExisting}
                      type="text"
                      name="id"
                      placeholder="ID must be unique"
                      onChange={handleChange}
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
                    <Label for="summary">Summary</Label>
                    <Input
                      rows={6}
                      type="textarea"
                      name="blurb"
                      placeholder="Info about the band/artist"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.blurb}
                    />
                    {errors.blurb && <div>{errors.blurb}</div>}
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
                  <div name="thumbImagesWrapper" style={{ display: "flex" }}>
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
                      <Label for="cardInput">Thumbnail image:</Label>
                      <div>
                        <input
                          type="file"
                          disabled={!isEditExisting}
                          name="cardInput"
                          onChange={this.handleThumbFileChange}
                        />
                      </div>
                      <button
                        disabled={!this.state.cardFileInfo.name}
                        onClick={() => {
                          sendStorageThumbStart({
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
                      <ThumbImage url={values.cardFullUrl} />
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

BandForm.propTypes = {
  errors: PropTypes.object,
  getBandInfoForId: PropTypes.func.isRequired,
  isEditExisting: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  match: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  saveStatus: PropTypes.string,
  saveError: PropTypes.object,
  sendStorageThumbStart: PropTypes.func.isRequired,
  thumbProgress: PropTypes.number.isRequired,
  submitDataToServer: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default BandForm;
