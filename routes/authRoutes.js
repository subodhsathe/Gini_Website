const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Login endpoint
router.post('/login', (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if password matches
    if (password !== process.env.GINI_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ role: 'admin' }, process.env.GINI_PASSWORD, {
      expiresIn: '24h',
    });

    res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
