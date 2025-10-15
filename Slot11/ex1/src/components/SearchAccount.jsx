import React, { useState } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';

function SearchAccount() {
  // ✅ Static account data
  const accounts = [
    {
      id: 1,
      username: 'john_doe',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      username: 'jane_smith',
      password: 'abcdef',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      username: 'khoa_dpd',
      password: 'password123',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      username: 'anna_nguyen',
      password: 'qwerty123',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  ];

  // ✅ useState for search term
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Filter accounts by username
  const filteredAccounts = accounts.filter((acc) =>
    acc.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container style={{ marginTop: '40px' }}>
      <h3 className="text-center text-primary mb-4">
        Exercise 6: Tìm kiếm Account
      </h3>

      {/* Search Input */}
      <Form.Control
        type="text"
        placeholder="Nhập username để tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          maxWidth: '400px',
          margin: '0 auto 30px auto',
          textAlign: 'center',
        }}
      />

      {/* Account List */}
      <Row className="justify-content-center">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((acc) => (
            <Col key={acc.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <Card.Img
                  variant="top"
                  src={acc.avatar}
                  alt={acc.username}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>@{acc.username}</Card.Title>
                  <Card.Text>
                    <strong>Password:</strong> {acc.password}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">Không tìm thấy kết quả</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchAccount;
