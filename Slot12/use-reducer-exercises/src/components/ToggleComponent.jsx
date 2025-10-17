// src/components/ToggleComponent.jsx
import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

// 1. Khởi tạo trạng thái ban đầu
const initialState = { isOn: false };

// 2. Viết hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { isOn: !state.isOn }; // Đảo ngược trạng thái
    default:
      return state;
  }
}

function ToggleComponent() {
  // 3. Dùng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);

  // 4. Hàm xử lý khi nhấn nút
  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 text-center shadow" style={{ width: "300px" }}>
        <h3>Bật / Tắt Trạng Thái</h3>
        <h2 style={{ color: state.isOn ? "green" : "red" }}>
          {state.isOn ? "🟢 ON" : "🔴 OFF"}
        </h2>
        <Button
          variant={state.isOn ? "danger" : "success"}
          onClick={toggle}
        >
          {state.isOn ? "Tắt" : "Bật"}
        </Button>
      </Card>
    </div>
  );
}

export default ToggleComponent;
