import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, title="Success", message, onClose }) {
  return (
    <Modal show={show} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}
