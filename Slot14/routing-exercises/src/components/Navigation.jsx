import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Trang Chủ
      </NavLink>
      <NavLink to="/san-pham" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Sản Phẩm
      </NavLink>
      <NavLink to="/lien-he" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Liên Hệ
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Dashboard
      </NavLink>
    </nav>
  );
}

export default Navigation;
