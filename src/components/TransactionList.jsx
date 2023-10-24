import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TransactionRow from './TransactionRow';
import Search from './Search';
import './TransactionList.css';

export default function TransactionList({ transactions }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      const filtered = transactions.filter((transaction) =>
        transaction.type.toLowerCase().includes(search.toLowerCase()) ||
        transaction.date.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [search, transactions]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Search
              transactions={transactions}
              setFilteredTransactions={setFilteredTransactions}
            />
    <div className="transactions-container">

      <div className="header">
        {search ? <h2>Search Results for "{search}"</h2> : <h1>My Transactions</h1>}
        <button className='create-button' onClick={() => navigate('/transactions/new')}>New</button>
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
    </>
  );
}
