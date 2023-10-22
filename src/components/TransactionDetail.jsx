import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './TransactionDetail.css'; 
const API = import.meta.env.VITE_BASE_URL;

function TransactionDetail() {
  const [transaction, setTransaction] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/transactions/${id}`)
      .then((res) => res.json())
      .then((transactionsData) => {
        setTransaction(transactionsData);
      })
      .catch(() => navigate("/not-found"));
  }, [id, navigate]);

  const handleDelete = () => {
    fetch(`${API}/transactions/${id}`, { method: "DELETE" })
      .then((res) => {
        alert("Transaction has been deleted!");
        navigate("/transactions");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="detail-container">
      <h2>Transaction Details</h2>
      <div className="detail-body"> 
        <div className="input-container"> 
          <strong>Category:</strong> {transaction.category}
        </div>
        <div className="input-container"> 
          <strong>Type:</strong> {transaction.type}
        </div>
        <div className="input-container"> 
          <strong>Description:</strong> {transaction.description}
        </div>
        <div className="input-container"> 
          <strong>Amount:</strong> {transaction.amount}
        </div>
        <div className="input-container"> 
          <strong>Date:</strong> {transaction.date}
        </div>
      </div>
      <div className="transaction-actions">
        <Link to={`/transactions`}>
          <button className="first-third">Back</button>
        </Link>
        <Link to={`/transactions/${id}/edit`}>
          <button className="second-third" >Edit</button>
        </Link>
        <button className="final-third" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TransactionDetail;
