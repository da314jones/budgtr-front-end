import React, { useEffect, useState } from 'react'
const API = import.meta.env.VITE_BASE_URL

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch(`${API}/transactions`)
        .then((res) => res.json())
        .then(transactions => setTransactions(transactions))
        console.log("API Data:", transactions)
        .catch(error => console.log(error))
    }, []);

  return (
    <div className="transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this Transaction</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return <transaction key={index} transaction={transaction} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}


