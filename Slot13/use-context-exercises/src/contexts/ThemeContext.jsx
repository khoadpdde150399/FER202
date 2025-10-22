import React, { createContext, useState, useContext } from "react";

// 1️⃣ Tạo Context với giá trị mặc định
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// 2️⃣ Provider để bao bọc ứng dụng
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // 3️⃣ Hàm đổi theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 4️⃣ Custom hook để sử dụng dễ hơn
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
