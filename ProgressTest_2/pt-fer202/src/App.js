import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import AuthContext from "./contexts/AuthContext";

function App() {
  const { state } = useContext(AuthContext);
  const user = state.user;
  const isAuthenticated = Boolean(user);

  // Normalize role + status for safety
  const role = user?.role?.toLowerCase();
  const status = user?.status?.toLowerCase();

  return (
    <Routes>
      {/* 🔐 Login page */}
      <Route path="/login" element={<Login />} />

      {/* 🏠 Home page — only active users can access */}
      <Route
        path="/home"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : status !== "active" ? (
            <p className="text-center mt-5 text-danger fw-bold">
              🚫 Invalid credentials or banned account!
            </p>
          ) : (
            <Home />
          )
        }
      />

      {/* 👤 User Management — only for admin with active status */}
      <Route
        path="/users"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : status !== "active" ? (
            <p className="text-center mt-5 text-danger fw-bold">
              🚫 Invalid credentials or banned account!
            </p>
          ) : role === "admin" ? (
            <UserList />
          ) : (
            <p className="text-center mt-5 text-danger fw-bold">
              🚫 You do not have permission to access this page!
            </p>
          )
        }
      />

      {/* 🔁 Default redirect */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
      />

      {/* ⚠️ 404 fallback */}
      <Route
        path="*"
        element={<p className="text-center mt-5">404 - Page not found</p>}
      />
    </Routes>
  );
}

export default App;
