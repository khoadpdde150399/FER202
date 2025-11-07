import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthContext from "./contexts/AuthContext";

function App() {
  const { state } = useContext(AuthContext);
  const isAuthenticated = Boolean(state.user);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
    </Routes>
  );
}

export default App;
