// src/components/account/AddressForm.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function AddressForm({ data, onChange, errors }) {
  return (
    <Form>
      <Form.Group className="mb-2">
        <Form.Label><i className="bi bi-geo-alt"></i> Street</Form.Label>
        <Form.Control isInvalid={!!errors.street} value={data.street || ""} onChange={e => onChange({ ...data, street: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>City</Form.Label>
            <Form.Control isInvalid={!!errors.city} value={data.city || ""} onChange={e => onChange({ ...data, city: e.target.value })} />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Country</Form.Label>
            <Form.Select isInvalid={!!errors.country} value={data.country || ""} onChange={e => onChange({ ...data, country: e.target.value })}>
              <option value="">Select country</option>
              <option>Vietnam</option>
              <option>USA</option>
              <option>UK</option>
              <option>Japan</option>
              <option>Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control isInvalid={!!errors.zip} value={data.zip || ""} onChange={e => onChange({ ...data, zip: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
