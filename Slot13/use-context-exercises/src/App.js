import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div>
      {/* 🔹 ThemeProvider wraps theme-based components */}
      <ThemeProvider>
        <CounterComponent />
        <LightSwitch />
      </ThemeProvider>

      {/* 🔹 AuthProvider wraps login system */}
      <AuthProvider>
        <div className="App">
          <LoginForm />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
