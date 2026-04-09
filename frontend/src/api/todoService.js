import apiClient from './apiClient';

// Fetch all todos
export const fetchTodos = async () => {
  try {
    const response = await apiClient.get('/todos/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch todos' };
  }
};

// Add new todo
export const addTodo = async (title) => {
  try {
    const response = await apiClient.post('/todos/', { title });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add todo' };
  }
};

// Update todo
export const updateTodo = async (id, updates) => {
  try {
    const response = await apiClient.put(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update todo' };
  }
};

// Delete todo
export const deleteTodo = async (id) => {
  try {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete todo' };
  }
};

export default apiClient;
