import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

// 1️⃣ Trạng thái ban đầu
const initialState = { isOn: false };

// 2️⃣ Reducer
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { isOn: !state.isOn };
    case "TURN_ON":
      return { isOn: true };
    case "TURN_OFF":
      return { isOn: false };
    default:
      return state;
  }
}

function LightSwitch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 text-center shadow"
        style={{
          width: "320px",
          background: theme === "light" ? "#ffffff" : "#333333",
          color: theme === "light" ? "#000000" : "#ffffff",
          transition: "all 0.3s ease",
        }}
      >
        <h3>Công Tắc Đèn</h3>
        <h2 style={{ color: state.isOn ? "limegreen" : "tomato" }}>
          {state.isOn ? "🟢 BẬT" : "🔴 TẮT"}
        </h2>

        {/* 🔹 Nút đổi theme */}
        <Button
          onClick={toggleTheme}
          style={{
            ...buttonStyle,
            background: theme === "light" ? "#6c757d" : "#f8f9fa",
            color: theme === "light" ? "#ffffff" : "#000000",
          }}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>

        {/* 🔹 Nút bật/tắt đèn */}
        <Button
          onClick={() => dispatch({ type: "TOGGLE" })}
          style={{ ...buttonStyle, background: "#007bff", color: "white" }}
        >
          Chuyển Đổi
        </Button>

        <Button
          onClick={() => dispatch({ type: "TURN_ON" })}
          style={{ ...buttonStyle, background: "#28a745", color: "white" }}
        >
          Bật
        </Button>

        <Button
          onClick={() => dispatch({ type: "TURN_OFF" })}
          style={{ ...buttonStyle, background: "#dc3545", color: "white" }}
        >
          Tắt
        </Button>
      </Card>
    </div>
  );
}

export default LightSwitch;
