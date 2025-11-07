import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import api from "../services/api";
import MyNavbar from "../components/MyNavbar";
import FilterBar from "../components/FilterBar";
import PaymentsTable from "../components/PaymentsTable";

export default function Home() {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [semester, setSemester] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await api.get("/payments?_page=1&_limit=100");
        setPayments(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      }
    }
    fetchPayments();
  }, []);

  useEffect(() => {
    let list = [...payments];

    // search by semester or course name (case-insensitive)
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.semester && p.semester.toLowerCase().includes(q)) ||
        (p.courseName && p.courseName.toLowerCase().includes(q))
      );
    }

    if (semester) {
      list = list.filter(p => p.semester === semester);
    }

    // sort
    if (sortBy) {
      switch (sortBy) {
        case "course_asc":
          list.sort((a,b) => a.courseName.localeCompare(b.courseName));
          break;
        case "course_desc":
          list.sort((a,b) => b.courseName.localeCompare(a.courseName));
          break;
        case "date_asc":
          list.sort((a,b) => new Date(a.date) - new Date(b.date));
          break;
        case "date_desc":
          list.sort((a,b) => new Date(b.date) - new Date(a.date));
          break;
        case "amount_asc":
          list.sort((a,b) => a.amount - b.amount);
          break;
        case "amount_desc":
          list.sort((a,b) => b.amount - a.amount);
          break;
        default:
          break;
      }
    }

    setFiltered(list);
  }, [payments, semester, search, sortBy]);

  function clearFilters() {
    setSemester("");
    setSearch("");
    setSortBy("");
  }

  return (
    <>
      <MyNavbar />
      <Container>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="mb-3">Payments</h5>

            <FilterBar
              semester={semester}
              setSemester={setSemester}
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClear={clearFilters}
            />

            <PaymentsTable payments={filtered} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
