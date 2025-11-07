import React, { createContext, useReducer, useEffect } from "react";
import api from "../services/api";

// 1️⃣ Create the Context
const PaymentContext = createContext();

// 2️⃣ Initial state
const initialState = {
  payments: [],
  filter: "",
  sortBy: "",
};

// 3️⃣ Reducer function
function paymentReducer(state, action) {
  switch (action.type) {
    case "SET_PAYMENTS":
      return { ...state, payments: action.payload };
    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, action.payload] };
    case "UPDATE_PAYMENT":
      return {
        ...state,
        payments: state.payments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PAYMENT":
      return {
        ...state,
        payments: state.payments.filter((p) => p.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

// 4️⃣ Provider component
export function PaymentProvider({ children }) {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  // Load payments from json-server
  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await api.get("/payments?_page=1&_limit=100");
        dispatch({ type: "SET_PAYMENTS", payload: res.data });
      } catch (err) {
        console.error("Failed to load payments:", err);
      }
    }
    fetchPayments();
  }, []);

  // CRUD functions
  async function addPayment(payment) {
    try {
      const res = await api.post("/payments", payment);
      dispatch({ type: "ADD_PAYMENT", payload: res.data });
    } catch (err) {
      console.error("Add payment failed:", err);
    }
  }

  async function updatePayment(id, updated) {
    try {
      const res = await api.put(`/payments/${id}`, updated);
      dispatch({ type: "UPDATE_PAYMENT", payload: res.data });
    } catch (err) {
      console.error("Update payment failed:", err);
    }
  }

  async function deletePayment(id) {
    try {
      await api.delete(`/payments/${id}`);
      dispatch({ type: "DELETE_PAYMENT", payload: id });
    } catch (err) {
      console.error("Delete payment failed:", err);
    }
  }

  // Provide data + functions
  const value = {
    state,
    dispatch,
    addPayment,
    updatePayment,
    deletePayment,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

// 5️⃣ Export the context (default)
export default PaymentContext;
