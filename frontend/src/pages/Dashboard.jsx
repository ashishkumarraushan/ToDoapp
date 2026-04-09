import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import AddTodo from '../component/AddTodo';
import TodoList from '../component/TodoList';
import * as todoService from '../api/todoService';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await todoService.fetchTodos();
      if (response.success) {
        setTodos(response.todos);
        setError('');
      }
    } catch (err) {
      setError(err.message || 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  const handleTodoDeleted = (todoId) => {
    setTodos(todos.filter((todo) => todo._id !== todoId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 mb-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2">My Todos</h2>
          <p className="text-blue-100">Stay organized and keep track of your tasks</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
            <button
              onClick={loadTodos}
              className="ml-4 text-red-600 hover:text-red-800 underline font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Add Todo Form */}
        <AddTodo onTodoAdded={handleTodoAdded} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onTodoUpdated={handleTodoUpdated}
          onTodoDeleted={handleTodoDeleted}
          loading={loading}
        />

        {/* Stats */}
        {!loading && todos.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-gray-700">
              {todos.filter((t) => t.completed).length} of {todos.length} tasks completed
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
