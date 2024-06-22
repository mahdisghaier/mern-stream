// routes/protectedRoute.js
const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
  // This route is protected and requires valid token
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;
