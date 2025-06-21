import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
// starting point of frontend sends request to backend to get all the posts and stores them in a array using useState hook 
// no dependency so it will return only once.
  useEffect(() => {
    axios.get('https://blogapp-o0ek.onrender.com/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []); // ek simple useEffect hook that fetches the list of posts from the backend API. since there is no dependency it renders only once.

  return (
    <div className="post-list">
      <h1 id='mainheading'>All Blog Posts</h1>
      <Link to="/admin" className="create-btn">+ Create New Post</Link>
      {posts.length === 0 ? (
        <p>No posts available. Click "Create Post" to get started.</p> // ek deafult message agar koi post create nahi ki hai to.
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



