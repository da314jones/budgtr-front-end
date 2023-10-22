import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionRow from './TransactionRow';
import './TransactionList.css'; 

export default function SearchResults({ transactions }) {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (search) {
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

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="transactions-container">
      <div className="header">
        <h2>Search Results for "{search}"</h2>
      </div>
      {currentItems.length === 0 ? (
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
              {currentItems.map((transaction, index) => (
                <TransactionRow key={transaction.id || index} transaction={transaction} />
              ))}
            </tbody>
          </table>
          <div className='table-buttons'>
            <button onClick={() => paginate(1)} disabled={currentPage === 1}>
              First
            </button>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
            <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
              Last
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
