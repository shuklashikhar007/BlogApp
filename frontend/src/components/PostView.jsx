import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // hooks which come in the react router dom 
import axios from 'axios';
import './PostView.css';

function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://blogapp-o0ek.onrender.com/api/posts/${id}`)
      .then(res => setPost(res.data)) // get the data of the particular post and set it to the post state using usestate hook 
      .catch(err => console.error(err));
  }, [id]); // ek useeffect hook which has dependency on the id so this will render whenever id changes or renders the first time

  const handleDelete = () => { // a function that sends a delte API request on being called for a particular id of a post.
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`https://blogapp-o0ek.onrender.com/api/posts/${id}`)
        .then(() => {
          alert("Post deleted successfully!");
          navigate('/'); // after deleteing a particular post we have to navigate back to the home page.
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




