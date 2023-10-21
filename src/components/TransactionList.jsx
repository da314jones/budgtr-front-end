import React from 'react';
import TransactionRow from './TransactionRow';
import { useLocation } from 'react-router-dom';

export default function TransactionList({ transactions }) {
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const search = queryParams.get('search');

const filteredTransactions = search
    ? transactions.filter((transaction) =>
        transaction.type.toLowerCase().includes(search.toLowerCase()) ||
        transaction.date.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase())
      )
    : transactions;

  return (
    <div className="transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <TransactionRow key={transaction.id || index} transaction={transaction} index={index} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
