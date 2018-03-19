import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmModal = ({
  displayModal = false,
  modalBody = "Body here",
  modalTitle = "Title here",
  handleOk,
  handleCancel
}) => (
  <Modal isOpen={displayModal}>
    <ModalHeader>{modalTitle}</ModalHeader>
    <ModalBody>{modalBody}</ModalBody>
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

export default ConfirmModal;
