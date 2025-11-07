import React, { createContext, useReducer } from "react";
import api from "../services/api";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem("user"),
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function login(username, password) {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await api.get(`/users?username=${username}&password=${password}`);
      const users = res.data;
      if (users.length === 0) throw new Error("Sai tài khoản hoặc mật khẩu!");

      const user = users[0];
      const role = user.role?.toLowerCase().trim();
      const status = user.status?.toLowerCase().trim();

      // 🚫 Locked/banned users cannot log in
      if (status !== "active") {
        throw new Error("Tài khoản của bạn đã bị khóa hoặc bị cấm!");
      }

      // ✅ Allow only known roles
      if (role !== "admin" && role !== "user") {
        throw new Error("Vai trò của bạn không được phép đăng nhập!");
      }

      const normalizedUser = { ...user, role, status };
      dispatch({ type: "LOGIN_SUCCESS", payload: normalizedUser });
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
