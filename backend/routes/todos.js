const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// All routes are protected - require authentication
router.use(asyncHandler(protect));

// GET /api/todos - Get all todos for user
router.get('/', asyncHandler(getTodos));

// POST /api/todos - Create a new todo
router.post('/', asyncHandler(createTodo));

// PUT /api/todos/:id - Update a todo
router.put('/:id', asyncHandler(updateTodo));

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', asyncHandler(deleteTodo));

module.exports = router;
