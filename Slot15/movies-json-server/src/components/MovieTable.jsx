import React from 'react';
import { Table, Button, Image, Modal, Spinner, Alert } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const genreMap = {
  1: 'Sci-Fi', 2: 'Comedy', 3: 'Drama', 4: 'Horror', 5: 'Romance', 6: 'Action', 7: 'Thriller'
};

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, loading, movieToDelete, showDeleteModal } = state;

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                <td><Image src={movie.avatar} alt={movie.title} style={{ width: '60px', height: '60px', objectFit: 'cover' }} rounded /></td>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{genreMap[movie.genreId]}</td>
                <td>{movie.duration} phút</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie })} className="me-2">Sửa</Button>
                  <Button variant="danger" size="sm" onClick={() => dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie })}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa phim "<strong>{movieToDelete?.title}</strong>" không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>Hủy</Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
