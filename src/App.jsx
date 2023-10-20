import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome'
import Transactions from './components/TransactionList'
import TransactionDetail from './components/TransactionDetail'
import TransactionEditForm from './components/TransactionEditForm'
import TransactionNewForm from './components/TransactionNewForm'
import FourOFour from './components/FourOFour'
import Navbar from './components/Navbar'

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [loading, setLoading] = useState(true);

  
    const setLightMode = () => {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  
    const setDarkMode = () => {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  
    const setSystemMode = () => {
      localStorage.removeItem('theme');
    }

  useEffect(() => {
   
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
  <>
    <Router>
      <div>
        <Navbar setLightMode={setLightMode} setDarkMode={setDarkMode} setSystemMode={setSystemMode}
        transactions={transactions} setFilteredTransactions={setFilteredTransactions} />
        <div className='content' >
          <div className='main' >       
      <Routes>
    <Route exact path="/" element={<Welcome />} />
    <Route exact path="/transactions" element={<Transactions transactions={filteredTransactions} />} />
    <Route path="/transactions/:id" element={<TransactionDetail />} />
    <Route path="/transactions/edit" element={<TransactionEditForm />} />
    <Route path="/transactions/new" element={<TransactionNewForm />} />
    <Route path="*" element={<FourOFour />} />
    </Routes>
    </div>
    </div>
    <div className='list' >
{showTransactions && <Transactions transactions={filteredTransactions} />}
    </div>
    </div>
    </Router>
    </>
  )
}

export default App
