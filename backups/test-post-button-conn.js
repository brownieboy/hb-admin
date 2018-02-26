import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";

import { saveNewStage } from "../dux/stagesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveNewStageProp: saveNewStage }, dispatch);

const mapStateToProps = state => ({
  loggedInState: state.firebaseLoginState
});

class TestPostButton extends Component {
  handlePost = () => {
    const { loggedIn } = this.props.loggedInState;
    const { saveNewStageProp } = this.props;
    saveNewStageProp({
      id: "newStage",
      name: "New Stage",
      sortOrder: 1000
    });
  };

  render() {
    return <Button onClick={this.handlePost}>Test Post</Button>;
  }
}

const TestPostButtonConn = connect(mapStateToProps, mapDispatchToProps)(
  TestPostButton
);

export default TestPostButtonConn;
