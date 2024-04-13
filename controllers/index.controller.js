const express = require('express');
const router = express.Router();
const { Event, User, Post } = require('../models/index.model');
const authMiddleware = require('../middleware/auth.middleware');

// Event Controller
router.get('/public/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.render('events', { events });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Event Controller
router.post('/events', authMiddleware, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log(req.user);
    const event = new Event({ title, description, date, creator: req.userId });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/events', authMiddleware, async (req, res) => {
  try {

    const events = await Event.find({
      creator: req.userId,
    });
    console.log('🚀 ~ router.get ~ events:', events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/events/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { description, date } = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: id, creator: req.userId },
      { description, date },
      { new: true }
    );
    if (!event) {
      return res
        .status(404)
        .json({ message: 'Event not found or unauthorized to update' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/events/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOneAndDelete({
      _id: id,
      creator: req.userId,
    });
    if (!event) {
      return res
        .status(404)
        .json({ message: 'Event not found or unauthorized to delete' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User Controller
// Assuming user creation, update, delete is done by admin or has different authorization logic

// Community Post Controller
router.post('/posts', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.userId,
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/posts/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: id, author: req.userId },
      { title, content },
      { new: true }
    );
    if (!post) {
      return res
        .status(404)
        .json({ message: 'Post not found or unauthorized to update' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/posts/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ _id: id, author: req.userId });
    if (!post) {
      return res
        .status(404)
        .json({ message: 'Post not found or unauthorized to delete' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//gte, delete or update user profile

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { username, email, phoneNumber, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, email, phoneNumber, address },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
