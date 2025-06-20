import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostView.css';

function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => {
        alert("Post not found");
        navigate('/');
      });
  }, [id, navigate]);

  const handleDelete = () => {
    const auth = JSON.parse(localStorage.getItem('authUser'));
    const headers = {
      username: auth?.username,
      password: auth?.password,
    };

    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:5000/api/posts/${id}`, { headers })
        .then(() => {
          alert("Post deleted");
          navigate('/');
        })
        .catch(() => alert("Failed to delete"));
    }
  };

  const isAdmin = () => {
    const auth = JSON.parse(localStorage.getItem('authUser'));
    return auth?.username === 'Admin' && auth?.password === 'admin123';
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-view">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/" className="back-btn">← Back to Posts</Link>
      {isAdmin() && (
        <div className="btn-group">
          <button onClick={() => navigate(`/admin/${post._id}`)}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
}

export default PostView;



