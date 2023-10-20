import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css"

export default function Welcome() {
  
    return (
      <div className="welcome-container">
        <h1>Welcome to My Budgetrr</h1>
        <p>How to use </p>
        <div className="navigation-buttons" >
          <Link to="/transactions">
            <button className="btn">Transactions</button>
          </Link>
            <Link to="/search">
              <button  className="btn">Search by Type And Date</button>
            </Link>
            </div>
      </div>
    );
  }
  