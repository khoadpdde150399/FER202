// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";
import MovieList from "../components/movies/MovieList";

export default function HomePage() {
  return (
    <div className="container mt-4">
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
