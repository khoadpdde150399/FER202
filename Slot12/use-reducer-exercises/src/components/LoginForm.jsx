import React, { useReducer, useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";

const initialState = { username: "", password: "" };

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = { username: "", password: "", general: "" };

    if (!state.username.trim()) {
      formErrors.username = "⚠️ Username is required!";
    }
    if (!state.password.trim()) {
      formErrors.password = "⚠️ Password is required!";
    }

    if (formErrors.username || formErrors.password) {
      setErrors(formErrors);
      return;
    }

    // Assuming the correct credentials are username="admin", password="1234"
    if (state.username === "admin" && state.password === "1234") {
      // success
      setErrors({ username: "", password: "", general: "" });
      setShowModal(true);
    } else {
      // credentials filled but wrong
      setErrors({ username: "", password: "", general: "❌ Username or password is incorrect!" });
    }
  };

  return (
    <Card className="p-3 mb-4 shadow-sm">
      <h4>Exercise 3: Login Form</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={state.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          {errors.username && (
            <Form.Text className="text-danger">
              {errors.username}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password}
            </Form.Text>
          )}
        </Form.Group>

        {errors.general && (
          <div className="mb-2 text-danger">
            {errors.general}
          </div>
        )}

        <Button type="submit" className="mt-3">
          Login
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-success">
          ✅ Welcome, {state.username}!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default LoginForm;
