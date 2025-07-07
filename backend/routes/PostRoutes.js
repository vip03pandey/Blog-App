const express=require('express');
const Post=require('../models/Post');
const router=express.Router();
const mongoose=require('mongoose');
const protect=require('../middleware/authMiddleware');
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
// write post
router.post('/', protect, async (req, res) => {
    const { title, content, image } = req.body;
    const post = new Post({ title, content, image, author: req.user.id });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  });

// get post
router.get('/', async (req, res) => {
  try {
      // Get page and limit from query parameters, with defaults
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Get total count for pagination info
      const totalPosts = await Post.countDocuments();
      
      // Fetch posts with pagination
      const posts = await Post.find()
          .sort({ createdAt: -1 })
          .populate('author', 'name avatar')
          .skip(skip)
          .limit(limit);

      const totalPages = Math.ceil(totalPosts / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      res.status(200).json({
          posts,
          pagination: {
              currentPage: page,
              totalPages,
              totalPosts,
              hasNextPage,
              hasPrevPage,
              limit
          }
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});




// get post by id
router.get('/:id', protect, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate('author', 'name avatar');
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  

// post comment
router.post('/:id/comment', protect, async (req, res) => {
    try {
    //   console.log('Received comment:', req.body.content);
    //   console.log('User:', req.user); // Check if this exists
      const { content } = req.body;
  
      const post = await Post.findById(req.params.id);
      if (!post) {
        console.log('Post not found');
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = {
        content,
        user: req.user.id,
      };
  
      post.comments.push(comment);
      await post.save();
  
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ message: error.message });
    }
  });
  

// get post comments
router.get('/:id/comment', protect, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate('comments.user', 'name avatar createdAt')
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// increment likes
router.put('/:id/like', protect, async (req, res) => {
  try {
    const article = await Post.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const { action } = req.body; // 'like' or 'unlike'

    if (action === 'like') {
      article.likes += 1;
    } else if (action === 'unlike' && article.likes > 0) {
      article.likes -= 1;
    }

    await article.save();

    res.status(200).json({ likes: article.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// generate titles for posts
router.post('/generateTitle', protect, async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Content is required' });
      }
  
      const prompt = `Write a catchy, SEO-friendly blog title for the following content:\n\n"${content}.The title should not be very long and should be under 80 characters."`;
  
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 20,
        temperature: 0.7,
      });
  
      const title = completion.choices[0]?.message?.content?.trim();
  
      res.status(200).json({ title });
    } catch (error) {
      console.error('OpenAI Error:', error);
      res.status(500).json({ message: 'Failed to generate title' });
    }
  });

module.exports=router;