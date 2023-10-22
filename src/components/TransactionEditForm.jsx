import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './TransactionEditForm.css'
const API = import.meta.env.VITE_BASE_URL;

export default function TransactionEditForm() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    id: "",
    category: "",
    type: "",
    description: "",
    amount: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setTransaction({ ...transaction, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    fetch(`${API}/transactions/${id}`)
      .then((res) => res.json())
      .then((transaction) => setTransaction(transaction))
      .catch(() => navigate("/not-found"));
  }, [id, navigate]);

  const updateTransaction = () => {
    const httpOptions = {
      method: "PUT",
      body: JSON.stringify(transaction),
      headers: {
        "Content-type": "application/json",
      },
    };

    fetch(`${API}/transactions/${id}`, httpOptions)
      .then(() => {
        alert('Transaction updated!');
        navigate(`/transactions/${id}`);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction();
  };

  return (
    <div className="detail-container">
      <h2>Update Transaction</h2>
      <form onSubmit={handleSubmit} className="detail-body">
        <div className="input-container">
          <label htmlFor="category">Category:</label>
          <input
            className="input-field"
            type="text"
            id="category"
            name="category"
            value={transaction.category}
            onChange={handleTextChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="type">Type:</label>
          <select
            className="input-field"
            id="type"
            name="type"
            value={transaction.type}
            onChange={handleTextChange}
          >
            <option value="Deposit">Deposit</option>
            <option value="Payment">Payment</option>
            <option value="Invoice">Invoice</option>
            <option value="Withdrawal">Withdrawal</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="description">Description:</label>
          <input
            className="input-field"
            type="text"
            id="description"
            name="description"
            value={transaction.description}
            onChange={handleTextChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="amount">Amount:</label>
          <input
            className="input-field"
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            value={transaction.amount}
            onChange={handleTextChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="date">Date:</label>
          <input
            className="input-field"
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleTextChange}
          />
        </div>
        <div className="transaction-actions">
          <button type="submit">Update Transaction</button>
          <Link to={`/transactions/${id}`}>
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
