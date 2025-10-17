import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CounterComponent from "./components/CounterComponent";
import ToggleComponent from "./components/ToggleComponent";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import QuestionBank from "./components/QuestionBank";
import QuestionBankEnhanced from "./components/QuestionBankEnhanced";

function App() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">useReducer Hook Exercises</h2>

      <CounterComponent />
      <ToggleComponent />
      <LoginForm />
      <SignUpForm />
      <QuestionBank />
      <QuestionBankEnhanced />
    </div>
  );
}

export default App;
