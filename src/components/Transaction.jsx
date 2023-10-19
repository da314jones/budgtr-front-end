import React from 'react'

export default function Transaction({transaction}) {

  return (
    <div>
      <p>{transaction.id}</p>
      <p>{transaction.category}</p>
      <p>{transaction.type}</p>
      <p>{transaction.description}</p>
      <p>{transaction.amount}</p>
      <p>{transaction.date}</p>
    </div>
  )
}