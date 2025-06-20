const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

