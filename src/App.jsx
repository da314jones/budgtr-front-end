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
import SplashImage from './components/SplashImage';
const API = import.meta.env.VITE_BASE_URL;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const [loading, setLoading] = useState(true);
    const { index } = useParams();
 


 

  useEffect(() => {
    fetch(`${API}/transactions`)
      .then((res) => res.json())
      .then(transactionsData => {
        console.log('Fetched Transactions:', transactionsData); 

        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch Error:', error); 
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Router>
        <div className="main-container">
          <div className='left-container'>
            <Navbar
              user={user}
              setUser={setUser}
              transactions={transactions}
              setFilteredTransactions={setFilteredTransactions}
            />
            <Search
              transactions={transactions}
              setFilteredTransactions={setFilteredTransactions}
            />

            <div className="content">
              <div className="main">
                <Routes>
                  <Route exact path="/" element={<Welcome setUser={setUser} />} />
                  <Route
                    exact
                    path="/transactions"
                    element={
                      <Transactions transactions={filteredTransactions} />
                    }
                  />
                  <Route
                    path="/transactions/search"
                    element={
                      <SearchResults
                        transactions={transactions}
                        transaction={filteredTransactions}
                      />
                    }
                  />
                  <Route
                    path="/transactions/:id"
                    element={<TransactionDetail />}
                  />
                  <Route
                    path="/transactions/:id/edit"
                    element={<TransactionEditForm />}
                  />
                  <Route
                    path="/transactions/new"
                    element={<TransactionNewForm />}
                  />
                  <Route path="*" element={<FourOFour />} />
                </Routes>
              </div>
            </div>
            <div className="list">
              {showTransactions && (
                <Transactions transactions={filteredTransactions} />
              )}
            </div>
          </div>
        <SplashImage />
        </div>
      </Router>
    </>
  );
}

export default App;
