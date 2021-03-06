import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import { notifyInfo as notifyInfoAction } from "../dux/react-redux-notify-helpers.js";
import { savePublishNow } from "../dux/publishReducer.js";
import { getAppearancesWithBandAndStageNames } from "../dux/appearancesReducer.js";
import { getBandsAlphabeticalEnhanced } from "../dux/bandsReducer.js";
import { selectStages as getStages } from "../dux/stagesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notifyInfo: notifyInfoAction,
      publishNow: savePublishNow
    },
    dispatch
  );

const mapStateToProps = state => ({
  loggedInState: state.firebaseLoginState,
  appearancesList: getAppearancesWithBandAndStageNames(state),
  bandsList: getBandsAlphabeticalEnhanced(state.bandsState.bandsList),
  stagesList: getStages(state),
  homePageText: state.homeState.homeText,
  contactUsPage: state.contactUsState.contactUs
});

class PublishButton extends Component {
  handlePublish = () => {
    const {
      appearancesList,
      bandsList,
      homePageText,
      notifyInfo,
      publishNow,
      stagesList,
      contactUsPage
    } = this.props;
    // console.log("handlePublish, stagesList:");
    // console.log(stagesList);
    notifyInfo("Pushing updated data out to phones...");
    publishNow({
      appearancesArray: appearancesList,
      bandsArray: bandsList,
      stagesArray: stagesList,
      homePageText,
      contactsPage: contactUsPage
    });
  };

  render() {
    return <Button color="success" onClick={this.handlePublish}>Publish to Phones</Button>;
  }
}

PublishButton.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  bandsList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  homePageText: PropTypes.string.isRequired,
  contactUsPage: PropTypes.object.isRequired,
  publishNow: PropTypes.func.isRequired,
  stagesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

const PublishButtonConn = connect(mapStateToProps, mapDispatchToProps)(
  PublishButton
);

export default PublishButtonConn;
