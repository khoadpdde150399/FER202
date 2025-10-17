import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap';

// 1️⃣ Khởi tạo trạng thái ban đầu
const initialState = { count: 0 };

// 2️⃣ Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  // 3️⃣ Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Giá trị hiện tại: {state.count}</p>
      
      <Button variant="primary" className="m-2" onClick={() => dispatch({ type: 'increment' })}>
        Tăng (+1)
      </Button>
      <Button variant="warning" className="m-2" onClick={() => dispatch({ type: 'decrement' })}>
        Giảm (-1)
      </Button>
      <Button variant="danger" className="m-2" onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </Button>
    </div>
  );
}

export default CounterComponent;
