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
    if (id) {
      axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const apiCall = id
      ? axios.put(`http://localhost:5000/api/posts/${id}`, form)
      : axios.post(`http://localhost:5000/api/posts`, form);

    apiCall
      .then(() => {
        alert(id ? "Post updated successfully!" : "Post created!");
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
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:5000/api/posts/${id}`)
        .then(() => {
          alert("Post deleted.");
          navigate('/');
        })
        .catch(err => console.error(err));
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
        maxLength={500}
        value={form.content}
        onChange={handleChange}
        placeholder="Write your content..."
        required
      />
      <p>{form.content.length} / 500 characters</p>
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

