const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/auth/signup
router.post('/signup', asyncHandler(signup));

// POST /api/auth/login
router.post('/login', asyncHandler(login));

module.exports = router;
