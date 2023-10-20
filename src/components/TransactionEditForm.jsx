import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

export default function TransactionEditForm() {
  let { index } = useParams();

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
    fetch(`${API}/transactions/${index}`)
      .then((res) => res.json())
      .then((transaction) => {
        console.log(transaction);
        setTransaction(transaction);
      })
      .catch(() => navigate("/not-found"));
  }, [index, navigate]);

  const updateTransaction = () => {
    const httpOptions = {
      method: "PUT",
      body: JSON.stringify(transaction),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${API}/transactions/${index}`, httpOptions)
      .then(() => {
        alert(`${transaction.category} has been updated!`);
        navigate(`/transaction/${index}`);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction();
  };

  return (
    <div>
      <h1>Update Transaction</h1>
      <form onSubmit={handleSubmit} className="update-transaction-form">
        <div>
          <label htmlFor="id">Transaction ID:</label>
          <input type="text" id="id" name="id" value={transaction.id} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={transaction.category}
            onChange={handleTextChange}
          />
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select
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

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={transaction.description}
            onChange={handleTextChange}
          />
        </div>

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            value={transaction.amount}
            onChange={handleTextChange}
          />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleTextChange}
          />
        </div>

        <div>
          <button type="submit">Update Transaction</button>
        </div>
      </form>
      {/* <Link to={`/transactions/${index}`}>
        <button>Cancel</button>
      </Link> */}
    </div>
  );
}
