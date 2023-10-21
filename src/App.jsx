import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import Transactions from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
import TransactionEditForm from './components/TransactionEditForm';
import TransactionNewForm from './components/TransactionNewForm';
import FourOFour from './components/FourOFour';
import Navbar from './components/Navbar';import SearchResults from './components/SearchResults';
import Search from './components/Search';
const API = import.meta.env.VITE_BASE_URL;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [loading, setLoading] = useState(true);
  const { index } = useParams();

  const setLightMode = () => {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  };

  const setDarkMode = () => {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  };

  const setSystemMode = () => {
    localStorage.removeItem('theme');
  };

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    fetch(`${API}/transactions`)
      .then((res) => res.json())
      .then(transactionsData => {
        console.log('Fetched Transactions:', transactionsData); // Add this log

        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch Error:', error); // Add error handling
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Router>
        <div>
          <Navbar setLightMode={setLightMode} setDarkMode={setDarkMode} setSystemMode={setSystemMode}
            transactions={transactions} setFilteredTransactions={setFilteredTransactions} />
          <Search transactions={transactions} setFilteredTransactions={setFilteredTransactions} />

          <div className='content'>
            <div className='main'>
              <Routes>
                <Route exact path="/" element={<Welcome />} />
                <Route exact path="/transactions" element={<Transactions transactions={filteredTransactions} />} />
                <Route path="/transactions/search" element={<SearchResults transactions={transactionsgit add}  transaction={filteredTransactions} />} /> {/* Use the SearchResults component */}
                <Route path="/transactions/:index" element={<TransactionDetail />} />
                <Route path="/transactions/edit" element={<TransactionEditForm />} />
                <Route path="/transactions/new" element={<TransactionNewForm />} />
                <Route path="*" element={<FourOFour />} />
              </Routes>
            </div>
          </div>
          <div className='list'>
            {showTransactions && <Transactions transactions={filteredTransactions} />}
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
