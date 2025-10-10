  // src/components/movies/MovieList.jsx
import React, { useEffect, useState } from "react";
import { Row, Col, Toast, Modal, Button, Image } from "react-bootstrap";
import MovieCard from "./MovieCard";
import { movies as defaultMovies } from "../../data/movie"; // ✅ make sure this matches your file name

export default function MovieList({ movies: moviesProp }) {
  // Use either passed-in movies (filtered list) or default movie data
  const moviesToRender =
    Array.isArray(moviesProp) && moviesProp.length
      ? moviesProp
      : defaultMovies;

  const [favourites, setFavourites] = useState([]);
  const [toast, setToast] = useState({ show: false, text: "" });
  const [modalMovie, setModalMovie] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavourites(saved);
  }, []);

  function addToFavorites(movie) {
    if (favourites.find((f) => f.id === movie.id)) {
      setToast({ show: true, text: `${movie.title} already in favourites.` });
      return;
    }
    const updated = [...favourites, { id: movie.id, title: movie.title }];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
    setToast({ show: true, text: `Added "${movie.title}" to favourites!` });
  }

  return (
    <>
      {/* Movie Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {moviesToRender.map((m) => (
          <Col key={m.id}>
            <MovieCard
              movie={m}
              onAddFavorite={addToFavorites}
              onShowDetails={(movie) => setModalMovie(movie)}
            />
          </Col>
        ))}
      </Row>

      {/* Toast */}
      <div style={{ position: "fixed", top: 12, right: 12, zIndex: 2000 }}>
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={2000}
          autohide
        >
          <Toast.Body>{toast.text}</Toast.Body>
        </Toast>
      </div>

      {/* Modal for Details */}
      <Modal show={!!modalMovie} onHide={() => setModalMovie(null)} size="lg">
        {modalMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalMovie.title}{" "}
                <small className="text-muted">({modalMovie.year})</small>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex">
                <div style={{ flex: "0 0 35%", marginRight: 16 }}>
                  <Image src={modalMovie.poster} alt={modalMovie.title} fluid />
                </div>
                <div style={{ flex: "1 1 auto" }}>
                  <p>{modalMovie.fullDescription || modalMovie.description}</p>
                  <p>
                    <strong>Genre:</strong> {modalMovie.genre}
                  </p>
                  <p>
                    <strong>Duration:</strong> {modalMovie.duration} min
                  </p>
                  <p>
                    <strong>Country:</strong> {modalMovie.country}
                  </p>
                  <p>
                    <strong>Showtimes:</strong>{" "}
                    {modalMovie.showtimes?.join(", ")}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalMovie(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  addToFavorites(modalMovie);
                  setModalMovie(null);
                }}
              >
                Add to Favourites
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
