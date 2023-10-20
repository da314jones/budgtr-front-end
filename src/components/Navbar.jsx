import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({transactions, setShowTransactions}) {
    const [searchParam, setSearchParam] = useState();

    const toggleDarkMode = () => {
        if(document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
        <Link to="/transactions">All Transactions</Link>
        <button onClick={() => setShowTransactions(true)}>Transactions</button>
      <button onClick={toggleDarkMode} className="text-white bg-gray-900 dark:bg-gray-100 p-2 rounded">
        Toggle Dark Mode
      </button>
    </nav>
  )
}
