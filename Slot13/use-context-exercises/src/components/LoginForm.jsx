import React, { useState } from "react";
import { Button, Form, Alert, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {
  const { user, isLoggedIn, error, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Đăng Nhập (Admin Only)</h3>

        {!isLoggedIn ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="primary" className="w-100">
              Đăng nhập
            </Button>
          </Form>
        ) : (
          <div className="text-center">
            <h5>Xin chào, {user.username}!</h5>
            <p>Email: {user.email}</p>
            <Button variant="danger" onClick={logout}>
              Đăng xuất
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default LoginForm;
