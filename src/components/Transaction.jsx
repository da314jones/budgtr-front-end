import React from 'react';

export default function Transaction({ transaction }) {
  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="transaction-detail">
      <h2>{transaction.category}</h2>
      <div>
        <strong>Description:</strong> <span>{transaction.description}</span>
      </div>
      <div>
        <strong>Amount:</strong> <span>{transaction.amount}</span>
      </div>
      <div>
        <strong>Date:</strong> <span>{transaction.date}</span>
      </div>
    </div>
  );
}


