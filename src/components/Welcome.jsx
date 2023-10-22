import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

import "./Welcome.css";

export default function Welcome({ setUser }) {
const [usernameFocused, setUsernameFocused] = useState("");
const [passwordFocused, setPasswordFocused] = useState("");
const navigate = useNavigate();

const handleUsernameFocus = () => {
  setUsernameFocused('focused');
};

const handleUsernameBlur = () => {
  setUsernameFocused('');
};

const handlePasswordFocus = () => {
  setPasswordFocused('focused');
};

const handlePasswordBlur = () => {
  setPasswordFocused('');
};

const handleUserAuth = (e) => {
  e.preventDefault();
  const user = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  const httpOptions = {
    "method" : "POST",
    "body" : JSON.stringify(user),
    "headers" :{
      "Content-type" : "application/json"
    }
  }
   fetch(`${API}/users/auth`, httpOptions)
   .then((res) =>res.json())
   .then((loggedInUser) => { 
     console.log(loggedInUser);
   setUser(loggedInUser);   
     navigate(`/transactions`);

   })
   .catch((err)=> console.error(err))

}



  return (
    <form onSubmit={handleUserAuth} >
    <div className="outer-container">
    <div className="welcome-container">
      <h1>Welcome Back</h1>
      <h2>Sign in to your Equilibrium account</h2>
      <div className={`input-container ${usernameFocused}`} >
      <label for="username">Username</label>
      <input type="text" name="username" onFocus={handleUsernameFocus} onBlur={handleUsernameBlur} />
      </div>
      <div className={`input-container ${passwordFocused}`}>
      <label for="password">Password</label>
      <input type="password" name="password" onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} />
      </div>
      <button>Login</button>
    </div>
    </div>
    </form>
  );
}
