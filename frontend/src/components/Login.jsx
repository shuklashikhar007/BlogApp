import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Admin' && password === 'admin123') {
      localStorage.setItem('authUser', JSON.stringify({ username, password }));
      navigate('/admin');
    } 
    else {
      alert('Invalid credentials');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      <h4>To create a post, you must be logged in as an admin</h4>
      <h5>To Test the App use the following credentials:</h5>
      <ul>
        <li>Username: Admin</li>
        <li>Password: admin123</li>
      </ul>
    </form>
  );
}

export default Login;

