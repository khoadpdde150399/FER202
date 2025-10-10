// src/components/movies/MovieCard.jsx
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "./MovieCard.css";

export default function MovieCard({ movie, onAddFavorite, onShowDetails }) {
  const shortDesc = movie.description.length > 120 ? movie.description.slice(0, 120) + "..." : movie.description;

  return (
    <Card className="mb-3 movie-card">
      <Card.Img variant="top" src={movie.poster} alt={movie.title} className="card-poster" />
      <Card.Body>
        <Card.Title>
          {movie.title} <Badge bg="info" className="text-dark">{movie.genre}</Badge>
        </Card.Title>
        <Card.Text style={{ fontSize: "0.95rem" }}>{shortDesc}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ fontSize: "0.9rem" }}>
            <small className="text-muted">{movie.year} • {movie.country} • {movie.duration} min</small>
          </div>
          <div>
            <Button size="sm" variant="outline-primary" className="me-2" onClick={() => onShowDetails(movie)}>Details</Button>
            <Button size="sm" variant="primary" onClick={() => onAddFavorite(movie)}>Add to Favourites</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
