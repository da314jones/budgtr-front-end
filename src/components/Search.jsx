import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search({ transactions, setFilteredTransactions }) {
  const [searchParams, setSearchParams] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/transactions/search?search=${searchParams}`);
    console.log('Searching for:', searchParams);

    const filtered = transactions.filter((transaction) => 
      transaction.type.toLowerCase().includes(searchParams.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchParams.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchParams.toLowerCase())
      
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by type, date, or category"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setFilteredTransactions(transactions)}>Reset</button>
    </div>
  );
}
