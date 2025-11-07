import React from "react";
import { Table } from "react-bootstrap";

export default function PaymentsTable({ payments }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Semester</th>
          <th>Course Name</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {payments.length === 0 ? (
          <tr><td colSpan="5" className="text-center">No payments found.</td></tr>
        ) : payments.map((p, idx) => (
          <tr key={p.id}>
            <td>{idx + 1}</td>
            <td>{p.semester}</td>
            <td>{p.courseName}</td>
            <td>{p.amount.toLocaleString()}</td>
            <td>{p.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
