import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AdjustTimesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesToAdjust: 0
    };
  }
  render() {
    const { displayModal = false, handleOk, handleCancel } = this.props;
    return (
      <Modal isOpen={displayModal}>
        <ModalHeader>Adjust Times</ModalHeader>
        <ModalBody>
          Enter the number of minutes you want to adjust start and end times by.
          A negative number will move the times forward.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleOk}>
            Ok
          </Button>{" "}
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

AdjustTimesModal.propTypes = {
  displayModal: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default AdjustTimesModal;
