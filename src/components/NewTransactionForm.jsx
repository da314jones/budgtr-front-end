import React from 'react'
import { Link, useParams, useNavigate }  from "react-router-dom";

export default function NewTransactionForm() {
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    category: "",
    type: "",
    description: "",
    amount: "",
    date: "",
  });

  const navigate = useNavigate;

  const handleTextChange = (e) => {
    setNewTransaction({ ...newTransactionForm, [e.target.id]: e.target.value });
  };

  const addTransaction = () => {
    const httpOptions = {
      "method" : "POST",
      "body" : JSON.stringify(newTransaction),
      "headers" :{
        "Content-type" : "application/json"
      }
    }
    fetch(`${API}/transactions`, httpOptions)
    .then((res) => {
      console.log(res)
      alert(`Transaction labeled '${newTransaction.category} was added to the database!`);
      navigate('/transactions');
    })
    .catch((err)=> console.error(err))
  };

const handleSubmit = (e) => {
  e.prevent.default();
  addTransaction();
};
  
return (
  <form onSubmit={handleSubmit} className="new-transaction-form">
    <div>
      <label htmlFor="id">Transaction ID:</label>
      <input type="text" id="id" name="transactionId" />
    </div>

    <div>
      <label htmlFor="category">Category:</label>
      <input type="text" id="category" name="category" />
    </div>

    <div>
      <label htmlFor="type">Type:</label>
      <select id="type" name="type">
        <option value="Deposit">Deposit</option>
        <option value="Payment">Payment</option>
        <option value="Invoice">Invoice</option>
        <option value="Withdrawal">Withdrawal</option>
      </select>
    </div>

    <div>
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" />
    </div>

    <div>
      <label htmlFor="amount">Amount:</label>
      <input type="number" id="amount" name="amount" step="0.01" />
    </div>

    <div>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" />
    </div>

    <div>
      <button type="submit" >Add Transaction</button>
    </div>
  </form>
);

}
