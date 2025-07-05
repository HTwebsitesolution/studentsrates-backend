const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create user
router.post('/', async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email required' });
  }

  try {
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
