import React, { useReducer } from "react";
import { Form, Button, Card } from "react-bootstrap";

const initialState = { username: "", password: "" };

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Add validation before success message
    if (!state.username.trim() || !state.password.trim()) {
      alert("Please fill in both Username and Password!");
      return;
    }

    alert(`Login Successful!\nUsername: ${state.username}`);
  };

  return (
    <Card className="p-3 mb-4">
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
    </Card>
  );
}

export default LoginForm;
