import React, { useState } from 'react';
import * as todoService from '../api/todoService';
import { Trash2, Plus } from 'lucide-react';

const AddTodo = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a todo title');
      return;
    }

    setLoading(true);
    try {
      const response = await todoService.addTodo(title);
      if (response.success) {
        setTitle('');
        onTodoAdded(response.todo);
      }
    } catch (err) {
      setError(err.message || 'Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default AddTodo;
