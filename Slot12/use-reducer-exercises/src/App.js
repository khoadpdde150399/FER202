// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Exercise 1–2
import CounterComponent from "./components/CounterComponent";
import ToggleComponent from "./components/ToggleComponent";

// Exercise 3–4
import LoginForm from "./components/LoginForm";
import ConfirmModal from "./components/ConfirmModal"; // used inside LoginForm

// Exercise 5–6
import QuestionBank from "./components/QuestionBank";
import QuestionBankEnhanced from "./components/QuestionBankEnhanced";

function App() {
  return (
    <div className="p-4 container">
      <h2 className="text-center mb-5 text-primary fw-bold">
        🎯 useReducer Hook Exercises
      </h2>

      {/* Exercise 1: Counter */}
      <section className="mb-5">
        <h4 className="text-secondary">Exercise 1: Counter Component</h4>
        <CounterComponent />
      </section>

      {/* Exercise 2: Toggle */}
      <section className="mb-5">
        <h4 className="text-secondary">Exercise 2: Toggle Component</h4>
        <ToggleComponent />
      </section>

      {/* Exercise 3: Login Form */}
      <section className="mb-5">
        <h4 className="text-secondary">Exercise 3: Login Form</h4>
        <LoginForm />
      </section>

      {/* Exercise 4: Confirm Modal */}
      <section className="mb-5">
        <h4 className="text-secondary">Exercise 4: Confirm Modal</h4>
        <p className="text-muted">
          ✅ The <strong>ConfirmModal</strong> component is used internally by the LoginForm.
          It appears automatically when a login is successful.
        </p>
        {/* Not displayed directly here, but imported to satisfy exercise requirement */}
        <ConfirmModal show={false} onClose={() => {}} message="Demo modal" />
      </section>

      {/* Exercise 5: Question Bank */}
      <section className="mb-5">
        <h4 className="text-secondary">Exercise 5: Question Bank</h4>
        <QuestionBank />
      </section>

      {/* Exercise 6: Enhanced Question Bank */}
      <section className="mb-5">
        <h4 className="text-secondary">Exercise 6: Enhanced Question Bank</h4>
        <QuestionBankEnhanced />
      </section>

      <footer className="text-center text-muted mt-5 mb-3">
        <small>Made with ❤️ for FER202 - useReducer Practice</small>
      </footer>
    </div>
  );
}

export default App;
