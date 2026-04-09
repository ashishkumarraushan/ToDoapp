const Todo = require('../models/todo');

// Get all todos for authenticated user
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new todo
exports.createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a todo title',
      });
    }

    // Create todo
    const todo = await Todo.create({
      title: title.trim(),
      userId: req.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update todo
exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Check if todo exists and belongs to user
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Verify ownership
    if (todo.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this todo',
      });
    }

    // Update todo
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Todo title cannot be empty',
        });
      }
      todo.title = title.trim();
    }

    if (completed !== undefined) {
      todo.completed = completed;
    }

    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if todo exists
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Verify ownership
    if (todo.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this todo',
      });
    }

    // Delete todo
    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
