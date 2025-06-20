import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import Login from './components/Login';
import './App.css';

function AppWrapper() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem('authUser'));

  const isAdmin = auth?.username === 'Admin' && auth?.password === 'admin123';

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem('authUser');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <h2>📝 My Blog</h2>
        <div>
          <Link to="/">Home</Link>
          {isAdmin && <Link to="/admin">Create Post</Link>}
          {isAdmin ? (
            <button onClick={logout}>🚪 Logout</button>
          ) : (
            <Link to="/login">🔐 Login</Link>
          )}
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostView />} />
        <Route path="/admin" element={<PostForm />} />
        <Route path="/admin/:id" element={<PostForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;





