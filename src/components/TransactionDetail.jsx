import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL

function TransactionDetail() {
  const [transaction, setTransaction] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch transaction data based on the ID parameter
    fetch(`${API}/transactions/${id}`)
      .then((res) => res.json())
      .then((transactionsData) => {
        console.log(transactionsData);
        setTransaction(transactionsData);
      })
      .catch(() => navigate("/not-found"));
  }, [id, navigate]);

  const handleDelete = () => {
    // Perform a DELETE request to delete the transaction
    fetch(`${API}/transactions/${id}`, { method: "DELETE" })
      .then((res) => {
        console.log(res);
        alert("Transaction has been deleted!");
        navigate("/transactions");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="TransactionDetail">
      <h2>Transaction Details</h2>
      <p>
        <strong>Category:</strong> {transaction.category}
      </p>
      <p>
        <strong>Type:</strong> {transaction.type}
      </p>
      <p>
        <strong>Description:</strong> {transaction.description}
      </p>
      <p>
        <strong>Amount:</strong> {transaction.amount}
      </p>
      <p>
        <strong>Date:</strong> {transaction.date}
      </p>
      <div className="transaction-actions">
        <Link to={`/transactions`}>
          <button>Back</button>
        </Link>
        <Link to={`/transactions/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TransactionDetail;
