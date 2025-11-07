import React, { useContext } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function MyNavbar() {
  const { state, logout } = useContext(AuthContext);
  const user = state.user;
  const navigate = useNavigate();

  const fullName = user?.fullName || user?.username || "";
  const role = user?.role?.toLowerCase(); // normalize role check

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          TuitionTracker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {/* 🏠 Common for everyone */}
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>

            {/* 👑 Only show if admin */}
            {role === "admin" && (
              <Nav.Link as={Link} to="/users">
                User Management
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto align-items-center">
            {user && (
              <div className="me-3">
                Signed in as <strong>{fullName}</strong>
              </div>
            )}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
