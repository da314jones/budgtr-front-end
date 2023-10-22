import React from 'react';
import { Link } from 'react-router-dom';

export default function TransactionRow({ transaction }) {

  return (
    <tr>
      <td>{transaction.category}</td>
      <td>{transaction.type}</td>
      <td>{transaction.description}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.date}</td>
      <td>{transaction.id}</td>
      <td>
        <Link to={`/transactions/${transaction.id}`}>Details</Link>
      </td>
    </tr>
  );
}
