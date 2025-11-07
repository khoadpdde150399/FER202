import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function FilterBar({
  semester,
  setSemester,
  search,
  setSearch,
  sortBy,
  setSortBy,
  onClear
}) {
  return (
    <Form className="mb-3">
      <Row className="g-2 align-items-end">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Search (semester or course)</Form.Label>
            <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="e.g. Fall 2025 or Database"/>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Semester</Form.Label>
            <Form.Control as="select" value={semester} onChange={e => setSemester(e.target.value)}>
              <option value="">All</option>
              <option>Fall 2025</option>
              <option>Spring 2025</option>
              <option>Summer 2025</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Control as="select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="course_asc">Course name A → Z</option>
              <option value="course_desc">Course name Z → A</option>
              <option value="date_asc">Date ↑</option>
              <option value="date_desc">Date ↓</option>
              <option value="amount_asc">Amount ↑</option>
              <option value="amount_desc">Amount ↓</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={3} className="d-flex gap-2">
          <Button variant="secondary" onClick={onClear}>Clear</Button>
        </Col>
      </Row>
    </Form>
  );
}
