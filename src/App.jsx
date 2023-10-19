import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Transactions from './components/transactions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Transactions />
    </>
  )
}

export default App
