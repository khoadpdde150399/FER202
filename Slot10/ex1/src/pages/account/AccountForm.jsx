// src/components/account/AccountForm.jsx
import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function AccountForm({ data, onChange, errors }) {
  return (
    <Form>
      <Form.Group className="mb-2">
        <Form.Label><i className="bi bi-person-circle"></i> Username</Form.Label>
        <InputGroup>
          <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
          <Form.Control isInvalid={!!errors.username} value={data.username || ""} onChange={e => onChange({ ...data, username: e.target.value })} />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label><i className="bi bi-lock"></i> Password</Form.Label>
        <InputGroup>
          <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
          <Form.Control type="password" isInvalid={!!errors.password} value={data.password || ""} onChange={e => onChange({ ...data, password: e.target.value })} />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" isInvalid={!!errors.confirmPassword} value={data.confirmPassword || ""} onChange={e => onChange({ ...data, confirmPassword: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Secret question</Form.Label>
        <Form.Control value={data.secretQuestion || ""} onChange={e => onChange({ ...data, secretQuestion: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Answer</Form.Label>
        <Form.Control value={data.secretAnswer || ""} onChange={e => onChange({ ...data, secretAnswer: e.target.value })} />
      </Form.Group>
    </Form>
  );
}
