import axios from 'axios';

// Create a single axios instance for all API calls
const apiClient = axios.create({
  baseURL: '/',
  timeout: 10000,
});

// Request interceptor to add token to every request
apiClient.interceptors.request.use(
  (config) => {
    // Get fresh token from localStorage on every request
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors (expired token)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If token is expired/invalid, clear it
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionally redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
