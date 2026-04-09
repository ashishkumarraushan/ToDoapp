const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the todo'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index on userId for faster queries
todoSchema.index({ userId: 1 });

module.exports = mongoose.model('Todo', todoSchema);
