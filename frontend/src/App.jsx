import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <Router>
      <nav className="navbar">
        <h2>📝 My Blog</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/admin">Create Post</Link>
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
      </Routes>
    </Router>
  );
}

export default App;


