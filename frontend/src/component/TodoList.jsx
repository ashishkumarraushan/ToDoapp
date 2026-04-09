import React from 'react';
import * as todoService from '../api/todoService';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';

const TodoList = ({ todos, onTodoUpdated, onTodoDeleted, loading }) => {
  const [updatingId, setUpdatingId] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);

  const handleToggleComplete = async (todo) => {
    setUpdatingId(todo._id);
    try {
      const response = await todoService.updateTodo(todo._id, {
        completed: !todo.completed,
      });
      if (response.success) {
        onTodoUpdated(response.todo);
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setDeletingId(todoId);
      try {
        const response = await todoService.deleteTodo(todoId);
        if (response.success) {
          onTodoDeleted(todoId);
        }
      } catch (error) {
        console.error('Failed to delete todo:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading todos...</div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No todos yet. Add one to get started!</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition"
        >
          <button
            onClick={() => handleToggleComplete(todo)}
            disabled={updatingId === todo._id}
            className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition disabled:opacity-50"
          >
            {todo.completed ? (
              <CheckCircle2 size={24} className="text-green-600" />
            ) : (
              <Circle size={24} />
            )}
          </button>

          <span
            className={`flex-1 text-lg ${
              todo.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>

          <button
            onClick={() => handleDelete(todo._id)}
            disabled={deletingId === todo._id}
            className="flex-shrink-0 text-gray-400 hover:text-red-600 transition disabled:opacity-50"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
