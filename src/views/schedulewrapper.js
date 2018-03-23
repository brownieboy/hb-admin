import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { handleCheck as handleCheckExt } from "../components/lifecycleextras.js";
import Schedule from "./schedule.js";
import ConfirmModal from "../components/confirm-modal.js";
import { buttonsBottomWrapperStyles } from "./viewstyles.js";

class ScheduleWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showConfirmDeleteModal: false
    };
    this.handleCheck = handleCheckExt.bind(this);
  }

  handleDeleteItems = () => {
    this.setState({ showConfirmDeleteModal: true });
  };

  render() {
    const { deleteAppearances } = this.props;
    return (
      <div>
        <h1>Schedule Wrapper</h1>
        <Schedule {...this.props} />
        <div style={buttonsBottomWrapperStyles}>
          <Link to="/scheduleform">Add appearance</Link>
          <Button
            color="danger"
            disabled={this.state.selectedItems.length === 0}
            style={{ marginLeft: 10 }}
            onClick={this.handleDeleteItems}
          >
            Delete selected
          </Button>
          <ConfirmModal
            displayModal={this.state.showConfirmDeleteModal}
            modalTitle="Delete Appearances?"
            modalBody="Are you sure that you want to delete the selected appearances?"
            handleOk={() => {
              deleteAppearances(this.state.selectedItems);
              this.setState({ showConfirmDeleteModal: false });
            }}
            handleCancel={() =>
              this.setState({ showConfirmDeleteModal: false })
            }
          />
        </div>
      </div>
    );
  }
}

ScheduleWrapper.propTypes = {
  deleteAppearances: PropTypes.func.isRequired
};

export default ScheduleWrapper;
