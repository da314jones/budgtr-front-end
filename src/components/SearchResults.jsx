import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionRow from './TransactionRow';
import './SearchResults.css'

export default function SearchResults({ transactions, index }) {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');

console.log('Search parameter:', search);
  console.log('Transactions:', transactions); 

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (search) {
        console.log(transactions)
      const filtered = transactions.filter((transaction) =>
        transaction.type.toLowerCase().includes(search.toLowerCase()) ||
        transaction.date.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions([]);
    }
  }, [search, transactions]);

  return (
    <div className="search-results">
      <h2>Search Results for "{search}"</h2>
      {filteredTransactions.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <section>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction id</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <TransactionRow key={transaction.id || index} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </section>
        
      )}
    </div>
  );
}




