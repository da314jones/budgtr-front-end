import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import TransactionDetail from './TransactionDetail';
const API = import.meta.env.VITE_BASE_URL

export default function DeleteTransaction() {
const [transaction, setTransaction] = useState([]);
let { index } = useParams();
let navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/transactions/${index}`)
        .then(res => res.json())
        .then(transaction => {
            console.log(transaction)
            setTransaction(transaction)
        })
        .catch(() => navigate("not-found"))
    }, [index, navigate]);

const handleDelete  = () => {
    const httpOptions = { "method" : "DELETE" };

   
        fetch(`${API}/transactions/${id}`, httpOptions)
        .then((res) => {
            console.log(res)
            alert("Hey - transaction was deleted!");
            navigate('/transactions');
        })
        .catch((err) => console.error(err))  
};

  return (
    <div>
      <TransactionDetail transaction={transaction} />
      <button onClick={handleDelete}>Delete Transaction</button>
    </div>
  )
}
