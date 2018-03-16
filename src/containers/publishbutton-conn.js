import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import { savePublishNow } from "../dux/publishReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ publishNow: savePublishNow }, dispatch);

const mapStateToProps = state => ({
  loggedInState: state.firebaseLoginState
});

class PublishButton extends Component {
  handlePublish = () => {
    console.log("handlePublish");
    const { publishNow } = this.props;
    publishNow();
  };

  render() {
    return <Button onClick={this.handlePublish}>Publish to Phones</Button>;
  }
}

PublishButton.propTypes = {
  publishNow: PropTypes.func.isRequired
};

const PublishButtonConn = connect(mapStateToProps, mapDispatchToProps)(
  PublishButton
);

export default PublishButtonConn;
