import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

// import "./Welcome.css";

export default function Enroll({ setUser }) {
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

const handleUserEnroll = (e) => {
  e.preventDefault();
  const user = {
    username: e.target.username.value,
    password: e.target.password.value,
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
  };
  const httpOptions = {
    "method" : "POST",
    "body" : JSON.stringify(user),
    "headers" :{
    "Content-type" : "application/json"
    }
  }
   fetch(`${API}/users`, httpOptions)
   .then((res) =>res.json())
   .then((createdUser) => { 
     console.log(createdUser);
     navigate(`/`);

   })
   .catch((err)=> console.error(err))

}



  return (
    <form onSubmit={handleUserEnroll} >
    <div className="outer-container">
    <div className="welcome-container">
      <h1>Enroll Now</h1>
      <h2>Sign up for your Equilibrium account</h2>
      <div className={`input-container ${usernameFocused}`} >
      <label for="firstName">First Name</label>
      <input type="text" name="firstName" onFocus={handleUsernameFocus} onBlur={handleUsernameBlur} />
      </div>
      <div className={`input-container ${passwordFocused}`}>
      <label for="lastName">Last Name</label>
      <input type="lastName" name="lastName" onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} />
      </div>
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
