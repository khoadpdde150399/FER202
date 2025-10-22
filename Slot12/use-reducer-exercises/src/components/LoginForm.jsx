// src/components/LoginForm.jsx
import React, { useReducer, useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";

const initialState = { username: "", password: "" };

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success"); // màu sắc modal (thành công / lỗi)

  const handleChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.username.trim() || !state.password.trim()) {
      setMessage("⚠️ Please fill in both Username and Password!");
      setVariant("danger");
    } else {
      setMessage(`✅ Login Successful!\nWelcome, ${state.username}!`);
      setVariant("success");
    }

    setShowModal(true);
  };

  return (
    <Card className="p-3 mb-4 shadow-sm">
      <h4>Exercise 3: Login Form</h4>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Login
        </Button>
      </Form>

      {/* ✅ Modal hiển thị thông báo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{variant === "success" ? "Login Success" : "Error"}</Modal.Title>
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

export default LoginForm;
