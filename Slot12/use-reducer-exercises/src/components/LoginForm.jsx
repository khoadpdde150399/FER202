import React, { useReducer } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal"; // ✅ Reusable modal

// 1️⃣ Khởi tạo trạng thái ban đầu
const initialState = {
  user: { username: "", password: "" },
  errors: {},
  showModal: false,
};

// 2️⃣ Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        user: { ...state.user, [action.field]: action.value },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };

    case "CLEAR_ERRORS":
      const { [action.field]: removed, ...rest } = state.errors;
      return { ...state, errors: rest };

    case "SET_SHOW_MODAL":
      return { ...state, showModal: true };

    case "CLOSE_MODAL":
      return {
        ...state,
        showModal: false,
        user: { username: "", password: "" },
        errors: {},
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

// 3️⃣ Component chính
function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });

    if (value.trim() === "") {
      dispatch({
        type: "SET_ERRORS",
        field: name,
        message: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      dispatch({ type: "CLEAR_ERRORS", field: name });
    }
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (state.user.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (state.user.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      for (const field in newErrors) {
        dispatch({
          type: "SET_ERRORS",
          field,
          message: newErrors[field],
        });
      }
    } else {
      dispatch({ type: "SET_SHOW_MODAL" });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form with useReducer</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.user.username}
                    onChange={handleChange}
                    isInvalid={!!state.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.user.password}
                    onChange={handleChange}
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-fill">
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-fill"
                    onClick={() => dispatch({ type: "RESET_FORM" })}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ✅ Confirm Modal */}
      <ConfirmModal
        show={state.showModal}
        title="Login Successful"
        message={`Welcome, ${state.user.username}! You have successfully logged in!`}
        onConfirm={handleCloseModal}
      />
    </Container>
  );
}

export default LoginForm;
