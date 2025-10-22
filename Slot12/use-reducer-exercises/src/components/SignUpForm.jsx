// src/components/SignUpForm.jsx
import React, { useReducer, useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";

const initialState = { username: "", email: "", password: "" };

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const handleChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.username.trim() || !state.email.trim() || !state.password.trim()) {
      setMessage("⚠️ Please fill in all fields before registering!");
      setVariant("danger");
    } else {
      const id = Math.floor(Math.random() * 10000);
      setMessage(`✅ Register Successful!\nYour ID: ${id}`);
      setVariant("success");
    }

    setShowModal(true);
  };

  return (
    <Card className="p-3 mb-4 shadow-sm">
      <h4>Exercise 4: Sign Up Form</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={state.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Register
        </Button>
      </Form>

      {/* ✅ Modal thông báo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {variant === "success" ? "Register Successful" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={variant === "success" ? "text-success" : "text-danger"}
        >
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default SignUpForm;
