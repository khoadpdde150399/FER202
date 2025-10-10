// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import MyNavbar from "./components/navbar/MyNavbar";
import HomePage from "./pages/HomePage";
import FooterPage from "./pages/FooterPage";
import AccountPage from "./pages/account/AccountPage"; // ✅ Correct path after moving your folder
import AccountForm  from "./pages/account/AccountForm";
import AboutForm  from "./pages/account/AboutForm";
import AddressForm  from "./pages/account/AddressForm";

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <MyNavbar />

      {/* All your routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/movies"
          element={
            <div className="container mt-4">
              <h3>🎞 Movies Page</h3>
              <p>All movies will be displayed here later.</p>
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <div className="container mt-4">
              <h3>About</h3>
              <p>This website is built as a React project for learning purposes.</p>
            </div>
          }
        />

        <Route
          path="/contact"
          element={
            <div className="container mt-4">
              <h3>Contact</h3>
              <p>Email: khoadang.ib6f@gmail.com</p>
            </div>
          }
        />

        {/* ✅ Account Page (your Build Your Profile wizard) */}
        <Route path="/account" element={<AccountPage />} />

        {/* ✅ Optional placeholder pages for dropdown items */}
        <Route
          path="/manage"
          element={
            <div className="container mt-4">
              <h3>Manage Profiles</h3>
              <p>This page will be added later.</p>
            </div>
          }
        />

        <Route
          path="/changepass"
          element={
            <div className="container mt-4">
              <h3>Change Password</h3>
              <p>This page will be added later.</p>
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <div className="container mt-4">
              <h3>Login Page</h3>
              <p>Login feature coming soon.</p>
            </div>
          }
        />

        <Route
          path="/favourites"
          element={
            <div className="container mt-4">
              <h3>Favourites</h3>
              <p>Your favourite movies will appear here.</p>
            </div>
          }
        />
      </Routes>

      {/* Footer always visible */}
      <FooterPage />
    </Router>
  );
}

export default App;
