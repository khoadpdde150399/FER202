import React, { useContext } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyNavbar() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  const fullName = state.user?.fullName || state.user?.username || "";

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand>TuitionTracker</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <div className="me-3">Signed in as <strong>{fullName}</strong></div>
          <Button variant="outline-secondary" size="sm" onClick={logout}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
