import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import ConfirmModal from "../components/ConfirmModal";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");

  const { state, login } = useContext(AuthContext);
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!usernameOrEmail.trim()) e.usernameOrEmail = "Username or Email is required.";
    if (!password) e.password = "Password is required.";
    if (password && password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (usernameOrEmail.includes("@")) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(usernameOrEmail))
        e.usernameOrEmail = "Email format is invalid.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // 🔐 Use AuthContext's login function
    await login(usernameOrEmail, password);

    // ✅ Check if login success
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.status === "active") {
      setWelcomeName(savedUser.fullName || savedUser.username);
      setShowConfirm(true);
    } else if (state.error) {
      setErrors({ form: state.error });
    } else {
      setErrors({ form: "Invalid credentials or banned account!" });
    }
  }

  function handleModalClose() {
    setShowConfirm(false);
    navigate("/home");
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h3 className="mb-3 text-center">Login</h3>
              {errors.form && <Alert variant="danger">{errors.form}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="Enter username or email"
                  />
                  {errors.usernameOrEmail && (
                    <Form.Text className="text-danger">
                      {errors.usernameOrEmail}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  )}
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={state.loading}>
                    {state.loading ? "Logging in..." : "Log in"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={showConfirm}
        title="Login successful"
        message={`Welcome, ${welcomeName}! Login successful.`}
        onClose={handleModalClose}
      />
    </Container>
  );
}
