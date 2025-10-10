// src/components/account/AboutForm.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function AboutForm({ data, onChange, errors }) {
  return (
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label><i className="bi bi-person"></i> First Name</Form.Label>
            <Form.Control isInvalid={!!errors.firstName} value={data.firstName || ""} onChange={e => onChange({ ...data, firstName: e.target.value })} />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control isInvalid={!!errors.lastName} value={data.lastName || ""} onChange={e => onChange({ ...data, lastName: e.target.value })} />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" isInvalid={!!errors.email} value={data.email || ""} onChange={e => onChange({ ...data, email: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control value={data.phone || ""} onChange={e => onChange({ ...data, phone: e.target.value })} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" value={data.age || ""} onChange={e => onChange({ ...data, age: e.target.value })} />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2">
        <Form.Label>Avatar (file)</Form.Label>
        <Form.Control type="file" onChange={e => onChange({ ...data, avatar: e.target.files && e.target.files[0] })} />
      </Form.Group>
    </Form>
  );
}
