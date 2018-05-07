// Render Prop
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Input, Progress } from "reactstrap";

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

class CardThumbImagesSubForm extends Component {
  render() {
    const {
      cardProgress,
      isEditExisting,
      sendStorageCardStart,
      sendStorageThumbStart,
      thumbProgress,
      values
    } = this.props;
    return (
      <Fragment>
        <h2>Images</h2>
        {!isEditExisting && (
          <div>
            You must save this form at least once before you can add images.
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
                  display: this.state.thumbFileInfo.name ? "block" : "none"
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
                  display: this.state.cardFileInfo.name ? "block" : "none"
                }}
              >
                <div className="text-center">{parseInt(cardProgress, 10)}%</div>
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
      </Fragment>
    );
  }
}

CardThumbImagesSubForm.propTypes = {
  cardProgress: PropTypes.number,
  isEditExisting: PropTypes.bool.isRequired,
  sendStorageCardStart: PropTypes.func,
  sendStorageThumbStart: PropTypes.func,
  thumbProgress: PropTypes.number,
  values: PropTypes.object
};

export default CardThumbImagesSubForm;
