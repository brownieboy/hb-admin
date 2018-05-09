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
      cardFileInfo,
      cardProgress,
      isEditExisting,
      handleCardFileChange,
      handleThumbFileChange,
      sendStorageCardStart,
      sendStorageThumbStart,
      thumbFileInfo,
      thumbProgress,
      values
    } = this.props;
    return (
      <Fragment>
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
                  onChange={handleThumbFileChange}
                />
              </div>
              <button
                disabled={!thumbFileInfo.name}
                onClick={() => {
                  sendStorageThumbStart({
                    id: values.id,
                    fileInfo: thumbFileInfo
                  });
                }}
              >
                Upload thumbnail
              </button>
              <div
                style={{
                  maxWidth: 200,
                  display: thumbFileInfo.name ? "block" : "none"
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
                  onChange={handleCardFileChange}
                />
              </div>
              <button
                disabled={!cardFileInfo.name}
                onClick={() => {
                  sendStorageCardStart({
                    id: values.id,
                    fileInfo: cardFileInfo
                  });
                }}
              >
                Upload card
              </button>
              <div
                style={{
                  maxWidth: 200,
                  display: cardFileInfo.name ? "block" : "none"
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
  cardFileInfo: PropTypes.object.isRequired,
  cardProgress: PropTypes.number,
  handleCardFileChange: PropTypes.func.isRequired,
  handleThumbFileChange: PropTypes.func.isRequired,
  isEditExisting: PropTypes.bool.isRequired,
  sendStorageCardStart: PropTypes.func.isRequired,
  sendStorageThumbStart: PropTypes.func.isRequired,
  thumbFileInfo: PropTypes.object.isRequired,
  thumbProgress: PropTypes.number,
  values: PropTypes.object
};

export default CardThumbImagesSubForm;
