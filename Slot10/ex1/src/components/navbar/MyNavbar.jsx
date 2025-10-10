// src/components/navbar/MyNavbar.jsx
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function MyNavbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(q)}`);
  }

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-3">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          🎬 Movie Studio
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex" onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control
                placeholder="Quick search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </InputGroup>
          </Form>

          {/* Right Side Menu */}
          <Nav className="ms-3">
            <NavDropdown
              title={<span><i className="bi bi-person-circle"></i> Account</span>}
              id="nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/account">
                Build your Account
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage">
                Manage Profiles
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/changepass">
                Change Password
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/login">
              <i className="bi bi-box-arrow-in-right"></i> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/favourites">
              <i className="bi bi-heart"></i> Favourites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
