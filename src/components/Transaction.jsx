import React from 'react';

function TransactionDetail({ transaction }) {
  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="transaction-detail">
      <h2>Transaction Detail</h2>
      <div>
        <strong>ID:</strong> <span>{transaction.id}</span>
      </div>
      <div>
        <strong>Category:</strong> <span>{transaction.category}</span>
      </div>
      <div>
        <strong>Type:</strong> <span>{transaction.type}</span>
      </div>
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

export default TransactionDetail;
