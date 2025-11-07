import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import api from "../services/api";
import MyNavbar from "../components/MyNavbar";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await api.get("/users");
    setUsers(res.data);
  }

  async function banUser(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const updated = { ...user, status: "locked" };
    await api.put(`/users/${id}`, updated);
    setUsers(users.map((u) => (u.id === id ? updated : u)));
  }

  const filteredUsers = users
    .filter((u) => u.username.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      if (sortBy === "role") return a.role.localeCompare(b.role);
      return 0;
    });

  return (
    <>
      <MyNavbar />
      <Container className="mt-3">
        <h4>User Management</h4>

        {/* Filter & Sort */}
        <Form className="d-flex gap-2 my-3">
          <Form.Control
            type="text"
            placeholder="Search username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "250px" }}
          />
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="">Sort by</option>
            <option value="name">Full Name</option>
            <option value="role">Role</option>
          </Form.Select>
        </Form>

        {/* Users Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  <img src={u.avatar} alt="avatar" width="40" height="40" />
                </td>
                <td>{u.username}</td>
                <td>{u.fullName}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => banUser(u.id)}
                    disabled={u.status === "locked"}
                  >
                    Ban
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
