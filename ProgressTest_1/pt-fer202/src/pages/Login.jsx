import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthContext from "../contexts/AuthContext";
import ConfirmModal from "../components/ConfirmModal";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!usernameOrEmail.trim()) e.usernameOrEmail = "Username or Email is required.";
    if (!password) e.password = "Password is required.";
    if (password && password.length < 6) e.password = "Password must be at least 6 characters.";
    // optional: email format if contains '@'
    if (usernameOrEmail.includes("@")) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(usernameOrEmail)) e.usernameOrEmail = "Email format is invalid.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    dispatch({ type: "LOGIN_START" });
    try {
      // fetch users from json-server
      const res = await api.get("/users");
      const users = res.data;
      // match by username OR fullName? brief said username or email - db.json has username and fullName, no email.
      // We will accept username OR fullName OR email if user had one
      const found = users.find(u =>
        u.username === usernameOrEmail || (u.email && u.email === usernameOrEmail) || (u.fullName && u.fullName === usernameOrEmail)
      );
      if (!found || found.password !== password) {
        dispatch({ type: "LOGIN_FAILURE", payload: "Invalid username/email or password!" });
        setErrors({ form: "Invalid username/email or password!" });
        return;
      }

      // on success: set user in context
      // For token we can generate a simple string (mock)
      const token = "fake-jwt-" + Date.now();
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: found, token } });

      // show modal
      setWelcomeName(found.username || found.fullName || found.email);
      setShowConfirm(true);
      // close modal -> redirect handled by modal close handler
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      setErrors({ form: "Server error. Please try later." });
    }
  }

  function handleModalClose() {
    setShowConfirm(false);
    navigate("/home");
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
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
                  {errors.usernameOrEmail && <Form.Text className="text-danger">{errors.usernameOrEmail}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">Log in</Button>
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
