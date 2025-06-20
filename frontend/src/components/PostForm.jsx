import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostForm.css';

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('authUser'));
    if (!auth || auth.username !== 'Admin' || auth.password !== 'admin123') {
      navigate('/login');
    }

    if (id) {
      axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = JSON.parse(localStorage.getItem('authUser'));
    const headers = {
      username: auth.username,
      password: auth.password,
    };

    const apiCall = id
      ? axios.put(`http://localhost:5000/api/posts/${id}`, form, { headers })
      : axios.post(`http://localhost:5000/api/posts`, form, { headers });

    apiCall
      .then(() => {
        alert(id ? "Post updated!" : "Post created!");
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        alert("Something went wrong.");
        setLoading(false);
        console.error(err);
      });
  };

  const handleDelete = () => {
    const auth = JSON.parse(localStorage.getItem('authUser'));
    const headers = {
      username: auth.username,
      password: auth.password,
    };

    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:5000/api/posts/${id}`, { headers })
        .then(() => {
          alert("Post deleted.");
          navigate('/');
        })
        .catch(err => {
          alert("Failed to delete.");
          console.error(err);
        });
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>{id ? "Edit Post" : "Create New Post"}</h1>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Post Title"
        required
      />
      <textarea
        name="content"
        maxLength={3000}
        value={form.content}
        onChange={handleChange}
        placeholder="Write your content..."
        required
      />
      <p>{form.content.length} / 3000 characters</p>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : id ? "Update" : "Create"} Post
      </button>
      {id && (
        <button type="button" onClick={handleDelete}>
          Delete Post
        </button>
      )}
    </form>
  );
}

export default PostForm;


