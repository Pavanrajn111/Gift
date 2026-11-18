const express = require('express');
const router = express.Router();

// In-memory subscriber list with initial mock persistence
const subscribers = new Set(['hello@charis.art']);

// POST /api/v1/newsletter
router.post('/', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format.',
      });
    }

    if (subscribers.has(trimmed)) {
      return res.json({
        success: true,
        message: 'You are already subscribed to CHARIS thoughtful notes.',
      });
    }

    subscribers.add(trimmed);

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to CHARIS thoughtfulness.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing newsletter subscription.',
    });
  }
});

module.exports = router;
