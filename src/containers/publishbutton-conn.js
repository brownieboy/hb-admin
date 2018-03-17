import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import { savePublishNow } from "../dux/publishReducer.js";
import { getAppearancesWithBandAndStageNames } from "../dux/appearancesReducer.js";
import { getBandsAlphabeticalEnhanced } from "../dux/bandsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      publishNow: savePublishNow
    },
    dispatch
  );

const mapStateToProps = state => ({
  loggedInState: state.firebaseLoginState,
  appearancesList: getAppearancesWithBandAndStageNames(state),
  bandsList: getBandsAlphabeticalEnhanced(state.bandsState.bandsList),
  homePageText: state.homeState.homeText
});

class PublishButton extends Component {
  handlePublish = () => {
    const { appearancesList, bandsList, homePageText, publishNow } = this.props;
    console.log("handlePublish");
    publishNow({ appearancesArray: appearancesList, bandsArray: bandsList, homePageText  });
  };

  render() {
    return <Button onClick={this.handlePublish}>Publish to Phones</Button>;
  }
}

PublishButton.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  bandsList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  homePageText: PropTypes.string.isRequired,
  publishNow: PropTypes.func.isRequired
};

const PublishButtonConn = connect(mapStateToProps, mapDispatchToProps)(
  PublishButton
);

export default PublishButtonConn;
