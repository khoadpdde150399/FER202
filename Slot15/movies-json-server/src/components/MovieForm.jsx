import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

const movieCategories = [
  { id: 1, name: 'Sci-Fi' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
  { id: 4, name: 'Horror' },
  { id: 5, name: 'Romance' },
  { id: 6, name: 'Action' },
  { id: 7, name: 'Thriller' }
];

const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview }) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Avatar Phim</Form.Label>
          <Form.Control type="file" name="avatarFile" accept="image/*" onChange={handleFileChange} className="mb-2" />
          <Form.Control type="text" name="avatar" value={currentMovie.avatar || ''} onChange={handleInputChange} placeholder="Hoặc nhập URL hình ảnh" />
          {imagePreview && <div className="mt-2"><Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px', maxHeight: '150px' }} /></div>}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tên Phim</Form.Label>
          <Form.Control type="text" name="title" value={currentMovie.title || ''} onChange={handleInputChange} placeholder="Tên phim" required />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formCategory">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select name="genreId" value={currentMovie.genreId || ''} onChange={handleInputChange} required>
            <option value="">Chọn danh mục</option>
            {movieCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>Thời lượng (phút)</Form.Label>
          <Form.Control type="number" name="duration" value={currentMovie.duration || ''} onChange={handleInputChange} placeholder="Phút" required />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formYear">
          <Form.Label>Năm</Form.Label>
          <Form.Control type="number" name="year" value={currentMovie.year || ''} onChange={handleInputChange} placeholder="Năm" required />
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col>
        <Form.Group controlId="formDesc">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={currentMovie.description || ''} onChange={handleInputChange} />
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { name: e.target.name, value: e.target.value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target.result);
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: ev.target.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...currentMovie,
      genreId: parseInt(currentMovie.genreId),
      duration: parseInt(currentMovie.duration),
      year: parseInt(currentMovie.year)
    };
    await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);
    setImagePreview('');
  };

  const handleCloseEditModal = () => dispatch({ type: 'CLOSE_EDIT_MODAL' });

  return (
    <>
      <Container className="p-3 mb-4 border">
        <h3 className="mb-3">➕ Thêm Phim Mới</h3>
        <Form onSubmit={handleSubmit}>
          <MovieFields
            currentMovie={currentMovie}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
          />
          <Button variant="success" type="submit">Thêm Phim</Button>
        </Form>
      </Container>

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={currentMovie.avatar}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Hủy</Button>
            <Button variant="warning" type="submit">Lưu Thay Đổi</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
