import React, { useState } from 'react'
import './Search.css'

export default function Search({ transactions, setFilteredTransactions, setShowTransactions }) {
    const [searchParams, setSearchParams] = useState("")
    
    const handleSearch = () => {
        const filtered = transactions.filter(
            (transaction) =>
            transaction.type.includes(searchParam) ||
            transaction.date.includes(searchParam) ||
            transaction.category.includes(searchParam)
            );
            setFilteredTransactions(filtered);
    };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by type, date, or category"
        value={searchParam}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setFilteredTransactions(transactions)}> Transactions</button>
      <button onClick={() => alert("This would open a tutorial.")}>How To</button>
    </div>
  )
}
