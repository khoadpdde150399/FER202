import React, { useContext, useMemo } from "react";
import { Container, Card } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import FilterBar from "../components/FilterBar";
import PaymentsTable from "../components/PaymentsTable";
import PaymentContext from "../contexts/PaymentContext";

export default function Home() {
  // 1️⃣ Get data and functions from PaymentContext
  const {
    state: { payments, filter, sortBy },
    dispatch,
    addPayment,
    updatePayment,
    deletePayment,
  } = useContext(PaymentContext);

  // 2️⃣ Apply filter + sort logic dynamically
  const filteredPayments = useMemo(() => {
    let list = [...payments];

    // Filter (search by semester or course name)
    if (filter) {
      const q = filter.toLowerCase();
      list = list.filter(
        (p) =>
          (p.semester && p.semester.toLowerCase().includes(q)) ||
          (p.courseName && p.courseName.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy) {
      switch (sortBy) {
        case "course_asc":
          list.sort((a, b) => a.courseName.localeCompare(b.courseName));
          break;
        case "course_desc":
          list.sort((a, b) => b.courseName.localeCompare(a.courseName));
          break;
        case "date_asc":
          list.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "date_desc":
          list.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "amount_asc":
          list.sort((a, b) => a.amount - b.amount);
          break;
        case "amount_desc":
          list.sort((a, b) => b.amount - a.amount);
          break;
        default:
          break;
      }
    }

    return list;
  }, [payments, filter, sortBy]);

  // 3️⃣ Functions to update filter/sort
  function handleFilterChange(value) {
    dispatch({ type: "SET_FILTER", payload: value });
  }

  function handleSortChange(value) {
    dispatch({ type: "SET_SORT", payload: value });
  }

  function clearFilters() {
    dispatch({ type: "SET_FILTER", payload: "" });
    dispatch({ type: "SET_SORT", payload: "" });
  }

  // 4️⃣ Add Payment form
  function handleAddPayment(e) {
    e.preventDefault();
    const form = e.target;
    const newPayment = {
      semester: form.semester.value,
      courseName: form.courseName.value,
      amount: parseFloat(form.amount.value),
      date: form.date.value,
    };
    addPayment(newPayment);
    form.reset();
  }

  return (
    <>
      <MyNavbar />
      <Container>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="mb-3">Payments</h5>

            {/* 🆕 Add Payment Form */}
            <form onSubmit={handleAddPayment} className="mb-4">
              <div className="d-flex gap-2 flex-wrap">
                <input
                  name="semester"
                  placeholder="Semester"
                  required
                  className="form-control"
                  style={{ width: "180px" }}
                />
                <input
                  name="courseName"
                  placeholder="Course Name"
                  required
                  className="form-control"
                  style={{ width: "200px" }}
                />
                <input
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  required
                  className="form-control"
                  style={{ width: "150px" }}
                />
                <input
                  name="date"
                  type="date"
                  required
                  className="form-control"
                  style={{ width: "180px" }}
                />
                <button type="submit" className="btn btn-success">
                  Add
                </button>
              </div>
            </form>

            {/* Filters */}
            <FilterBar
              search={filter}
              setSearch={handleFilterChange}
              sortBy={sortBy}
              setSortBy={handleSortChange}
              onClear={clearFilters}
            />

            {/* Payments table */}
            <PaymentsTable payments={filteredPayments} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
