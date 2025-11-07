import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import PaymentContext from "../contexts/PaymentContext";

export default function PaymentsTable({ payments }) {
  const { deletePayment, updatePayment } = useContext(PaymentContext);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Semester</th>
          <th>Course Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              No payments found.
            </td>
          </tr>
        ) : (
          payments.map((p, idx) => (
            <tr key={p.id}>
              <td>{idx + 1}</td>
              <td>{p.semester}</td>
              <td>{p.courseName}</td>
              <td>{p.amount.toLocaleString()}</td>
              <td>{p.date}</td>
              <td>
                {/* 🟡 Edit (example: +1000 to amount) */}
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() =>
                    updatePayment(p.id, { ...p, amount: p.amount + 1000 })
                  }
                >
                  Edit
                </Button>

                {/* 🔴 Delete */}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this payment?")) {
                      deletePayment(p.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
