import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmModal({ show, onClose, onConfirm, title, message }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirm Action"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message || "Are you sure you want to continue?"}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
