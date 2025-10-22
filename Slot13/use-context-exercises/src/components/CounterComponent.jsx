import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext"; // 🔹 useTheme hook

// 1️⃣ Trạng thái ban đầu
const initialState = { count: 0 };

// 2️⃣ Hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  // 3️⃣ useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 4️⃣ useTheme
  const { theme, toggleTheme } = useTheme();

  // 5️⃣ Style
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
        <h3>Bộ Đếm Đa Năng</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          Giá trị hiện tại: {state.count}
        </p>

        {/* 🔹 Nút đổi giao diện */}
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

        {/* 🔹 Nút tăng giảm reset */}
        <Button
          onClick={() => dispatch({ type: "increment" })}
          style={{ ...buttonStyle, background: "#007bff", color: "white" }}
        >
          Tăng (+1)
        </Button>

        <Button
          onClick={() => dispatch({ type: "decrement" })}
          style={{ ...buttonStyle, background: "#ffc107", color: "#333" }}
        >
          Giảm (-1)
        </Button>

        <Button
          onClick={() => dispatch({ type: "reset" })}
          style={{ ...buttonStyle, background: "#dc3545", color: "white" }}
        >
          Reset
        </Button>
      </Card>
    </div>
  );
}

export default CounterComponent;
