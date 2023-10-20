import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome'
import Transactions from './components/TransactionList'
import TransactionDetail from './components/TransactionDetail'
import TransactionEditForm from './components/TransactionEditForm'
import TransactionNewForm from './components/TransactionNewForm'
import FourOFour from './components/FourOFour'

function App() {

  useEffect(() => {
   
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  return (
  <>
    <Router>
      <div>
        {/* <Navbar /> */}
      <Routes>
    <Route exact path="/" element={<Welcome />} />
    <Route exact path="/transactions" element={<Transactions />} />
    <Route path="/transactions/:id" element={<TransactionDetail />} />
    <Route path="/transactions/edit" element={<TransactionEditForm />} />
    <Route path="/transactions/new" element={<TransactionNewForm />} />
    <Route path="*" element={<FourOFour />} />
    </Routes>
    </div>
    </Router>
    </>
  )
}

export default App
