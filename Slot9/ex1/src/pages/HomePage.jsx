// src/pages/HomePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import HomeCarousel from "../components/home/HomeCarousel";
import MovieList from "../components/movies/MovieList";
import FilterCard from "../components/Filter/FilterCard";
import { movies as allMovies } from "../data/movie"; // ✅ make sure filename matches
import "../App.css";

export default function HomePage() {
  const location = useLocation();

  // ✅ Get quick search query (?q= in URL)
  const qParam = useMemo(() => {
    return new URLSearchParams(location.search).get("q") || "";
  }, [location.search]);

  const [filterState, setFilterState] = useState({
    search: qParam,
    year: "all",
    sort: "none",
  });

  // ✅ update filter state when search param changes
  useEffect(() => {
    setFilterState((s) => ({ ...s, search: qParam }));
  }, [qParam]);

  function applyFilters(filters) {
    setFilterState(filters);
  }

  // ✅ filter + sort movies
  const filteredMovies = useMemo(() => {
    let list = allMovies.slice();

    // search filter
    const search = (filterState.search || "").trim().toLowerCase();
    if (search) {
      list = list.filter((m) =>
        (m.title + " " + (m.description || "")).toLowerCase().includes(search)
      );
    }

    // year filter
    if (filterState.year === "le2000") list = list.filter((m) => m.year <= 2000);
    if (filterState.year === "2001-2015")
      list = list.filter((m) => m.year >= 2001 && m.year <= 2015);
    if (filterState.year === "gt2015") list = list.filter((m) => m.year > 2015);

    // sorting
    if (filterState.sort === "year-asc") list.sort((a, b) => a.year - b.year);
    if (filterState.sort === "year-desc") list.sort((a, b) => b.year - a.year);
    if (filterState.sort === "title-asc") list.sort((a, b) => a.title.localeCompare(b.title));
    if (filterState.sort === "title-desc") list.sort((a, b) => b.title.localeCompare(a.title));
    if (filterState.sort === "duration-asc") list.sort((a, b) => a.duration - b.duration);
    if (filterState.sort === "duration-desc") list.sort((a, b) => b.duration - a.duration);

    return list;
  }, [filterState]);

  return (
    <div className="fade-in container mt-3">
      <HomeCarousel />
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>
      </div>

      <Row className="mt-4 g-3">
        <Col md={4}>
          {/* Filter sidebar */}
          <FilterCard onApply={applyFilters} />
        </Col>
        <Col md={8}>
          {/* Movie list with filters */}
          <MovieList movies={filteredMovies} />
        </Col>
      </Row>
    </div>
  );
}
