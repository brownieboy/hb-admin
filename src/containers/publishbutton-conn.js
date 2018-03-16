import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import { savePublishNow } from "../dux/publishReducer.js";
import { getAppearancesWithBandAndStageNames } from "../dux/appearancesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      publishNow: savePublishNow
    },
    dispatch
  );

const mapStateToProps = state => ({
  loggedInState: state.firebaseLoginState,
  appearancesList: getAppearancesWithBandAndStageNames(state)
});

class PublishButton extends Component {
  handlePublish = () => {
    const { appearancesList, publishNow } = this.props;
    console.log("handlePublish");
    publishNow({ appearancesArray: appearancesList });
  };

  render() {
    return <Button onClick={this.handlePublish}>Publish to Phones</Button>;
  }
}

PublishButton.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  publishNow: PropTypes.func.isRequired
};

const PublishButtonConn = connect(mapStateToProps, mapDispatchToProps)(
  PublishButton
);

export default PublishButtonConn;
