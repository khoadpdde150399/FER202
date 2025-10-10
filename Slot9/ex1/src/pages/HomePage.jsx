// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";
import MovieList from "../components/movies/MovieList";
import "../App.css"; // ✅ make sure this is imported so the fade-in works

export default function HomePage() {
  return (
    <div className="fade-in container mt-4">
      <HomeCarousel />
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>
        <MovieList />
      </div>
    </div>
  );
}
