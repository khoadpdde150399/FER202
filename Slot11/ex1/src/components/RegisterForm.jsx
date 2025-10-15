import React, { useState } from 'react';
import { Form, Button, Toast, Modal, Card } from 'react-bootstrap';

function RegisterForm() {
  // ✅ State for form fields
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });

  // ✅ State for validation errors
  const [errors, setErrors] = useState({});

  // ✅ State for Toast and Modal
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // -----------------------------
  // Validation Functions
  // -----------------------------
  const validateUsername = (name) => /^[A-Za-z0-9_.]{3,}$/.test(name.trim());
  const validateEmail = (email) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validatePassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);

  // -----------------------------
  // Handle Input Change
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Live validation
    let newErrors = { ...errors };
    if (name === 'username' && !validateUsername(value))
      newErrors.username = 'Username ≥ 3 ký tự, chỉ gồm chữ, số, _ hoặc .';
    else if (name === 'username') delete newErrors.username;

    if (name === 'email' && !validateEmail(value))
      newErrors.email = 'Email không hợp lệ.';
    else if (name === 'email') delete newErrors.email;

    if (name === 'password' && !validatePassword(value))
      newErrors.password =
        'Password ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
    else if (name === 'password') delete newErrors.password;

    if (name === 'confirm' && value !== form.password)
      newErrors.confirm = 'Mật khẩu xác nhận không khớp.';
    else if (name === 'confirm') delete newErrors.confirm;

    setErrors(newErrors);
  };

  // -----------------------------
  // Check if all valid
  // -----------------------------
  const isFormValid =
    validateUsername(form.username) &&
    validateEmail(form.email) &&
    validatePassword(form.password) &&
    form.confirm === form.password;

  // -----------------------------
  // Handle Submit
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setShowToast(true);
    setShowModal(true);
  };

  // -----------------------------
  // Handle Cancel
  // -----------------------------
  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
  };

  // -----------------------------
  // JSX Render
  // -----------------------------
  return (
    <div style={{ maxWidth: '500px', margin: '30px auto' }}>
      <h3>Exercise 7: Form Đăng Ký Tài Khoản</h3>

      <Form onSubmit={handleSubmit}>
        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nhập username"
          />
          {errors.username && (
            <Form.Text className="text-danger">{errors.username}</Form.Text>
          )}
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
          {errors.email && (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          )}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />
          {errors.password && (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          )}
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
          />
          {errors.confirm && (
            <Form.Text className="text-danger">{errors.confirm}</Form.Text>
          )}
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={!isFormValid}>
            Submit
          </Button>
        </div>
      </Form>

      {/* Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#28a745',
          color: 'white',
        }}
      >
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal with Submitted Data */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Đăng Ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{form.username}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {form.email}
                <br />
                <strong>Password:</strong> {form.password}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegisterForm;
