import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

export default function Navbar({ transactions, setFilteredTransactions }) {
  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
      <Link to="/transactions"><button>All Transactions</button></Link>
      <button className='instructional'>How To:</button>
      <button onClick={toggleDarkMode} className="text-white bg-gray-900 dark:bg-gray-100 p-2 rounded">
        Toggle Dark Mode
      </button>
    </nav>
  );
}
