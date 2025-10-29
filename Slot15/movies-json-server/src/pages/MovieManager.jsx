// src/pages/MovieManager.jsx
import React from "react";
import { Container } from "react-bootstrap";
import { MovieProvider } from "../contexts/MovieContext";
import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";

// Component con hiển thị nội dung chính
const MovieManagerContent = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">
        🎬 Quản lý Phim (Context + useReducer + Axios)
      </h1>

      {/* Form thêm mới phim */}
      <MovieForm />

      <h2 className="mt-4">Danh sách Phim</h2>

      {/* Bảng hiển thị danh sách phim */}
      <MovieTable />
    </Container>
  );
};

// Component chính bao bọc toàn bộ trong Provider
const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
