import React, { useEffect, useState } from 'react';
import TransactionDetail from './TransactionDetail'; 
const API = import.meta.env.VITE_BASE_URL;

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${API}/transactions`)
      .then((res) => res.json())
      .then(transactionsData => {
        setTransactions(transactionsData);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setFilteredTransactions(transactions)
      });
  }, [transactions]);

  

  return (
    <div className="transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this Transaction</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <TransactionDetail key={transaction.id || index} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
