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
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:5000/api/posts/${id}`)
        .then(() => {
          alert("Post deleted successfully!");
          navigate('/');
        })
        .catch(() => alert("Error deleting post."));
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-view">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/" className="back-btn">← Back to Posts</Link>
      <div className="btn-group">
        <button onClick={() => navigate(`/admin/${id}`)}>✏️ Edit</button>
        <button onClick={handleDelete}>🗑️ Delete</button>
      </div>
    </div>
  );
}

export default PostView;


