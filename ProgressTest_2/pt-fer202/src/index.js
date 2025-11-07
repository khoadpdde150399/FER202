import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./contexts/AuthContext";
import { PaymentProvider } from "./contexts/PaymentContext"; // 🆕 Add this line

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PaymentProvider>   {/* 🆕 Wrap App with PaymentProvider */}
          <App />
        </PaymentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
