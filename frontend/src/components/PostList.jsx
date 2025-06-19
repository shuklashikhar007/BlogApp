import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="post-list">
      <h1 id='mainheading'>All Blog Posts</h1>
      <Link to="/admin" className="create-btn">+ Create New Post</Link>
      {posts.length === 0 ? (
        <p>No posts available. Click "Create Post" to get started.</p>
      ) : (
        <div className="grid">
          {posts.map(post => (
            <Link key={post._id} to={`/posts/${post._id}`} className="card">
              <h3>{post.title}</h3>
              <p>{post.content.slice(0, 100)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;

