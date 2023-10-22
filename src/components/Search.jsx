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
    setSearchParams('')

  };

  const handleReset = () => {
    setFilteredTransactions(transactions);
    navigate(`/transactions`);
  }

  const handleKeyDown  = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      console.log()
    }
  }
  
  

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by type, date, or category"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
