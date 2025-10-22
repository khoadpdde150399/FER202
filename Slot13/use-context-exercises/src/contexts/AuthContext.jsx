import React, { createContext, useReducer, useContext } from "react";

// 1️⃣ Dữ liệu mẫu (mock data)
const mockAccounts = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    username: "user1",
    email: "user1@example.com",
    password: "123456",
    role: "user",
    status: "active",
  },
  {
    id: 3,
    username: "user2",
    email: "user2@example.com",
    password: "123456",
    role: "user",
    status: "locked",
  },
];

// 2️⃣ Trạng thái ban đầu
const initialState = {
  user: null,
  error: null,
  isLoggedIn: false,
};

// 3️⃣ Reducer xử lý các hành động
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, isLoggedIn: true, error: null };
    case "LOGIN_FAIL":
      return { ...state, error: action.payload, user: null, isLoggedIn: false };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

// 4️⃣ Tạo Context
export const AuthContext = createContext();

// 5️⃣ Provider bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (email, password) => {
    const found = mockAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (!found) {
      dispatch({ type: "LOGIN_FAIL", payload: "Sai email hoặc mật khẩu!" });
    } else if (found.role !== "admin") {
      dispatch({
        type: "LOGIN_FAIL",
        payload: "Chỉ tài khoản admin được phép đăng nhập!",
      });
    } else if (found.status !== "active") {
      dispatch({ type: "LOGIN_FAIL", payload: "Tài khoản đã bị khóa!" });
    } else {
      dispatch({ type: "LOGIN_SUCCESS", payload: found });
    }
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6️⃣ Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
