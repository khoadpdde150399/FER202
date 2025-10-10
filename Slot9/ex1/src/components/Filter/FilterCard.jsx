// src/components/Filter/FilterCard.jsx
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function FilterCard({ onApply }) {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState("none");

  function apply() {
    onApply && onApply({ search, year, sort });
  }

  function resetAll() {
    setSearch("");
    setYear("all");
    setSort("none");
    onApply && onApply({ search: "", year: "all", sort: "none" });
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Filter & Search</Card.Title>
        <Form.Group className="mb-2">
          <Form.Label>Search</Form.Label>
          <Form.Control placeholder="Search by title or description..." value={search} onChange={e => setSearch(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Year</Form.Label>
          <Form.Select value={year} onChange={e => setYear(e.target.value)}>
            <option value="all">All</option>
            <option value="le2000">Year ≤ 2000</option>
            <option value="2001-2015">2001 - 2015</option>
            <option value="gt2015">Year &gt; 2015</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Sort</Form.Label>
          <Form.Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="none">None</option>
            <option value="year-asc">Year ↑</option>
            <option value="year-desc">Year ↓</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
            <option value="duration-asc">Duration ↑</option>
            <option value="duration-desc">Duration ↓</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={apply}>Apply</Button>
          <Button variant="outline-secondary" onClick={resetAll}>Reset</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
