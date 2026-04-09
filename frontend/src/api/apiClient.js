import axios from 'axios';

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  const backendUrl = import.meta.env.VITE_API_URL;
  
  // For production (Render): use full backend URL with /api
  if (backendUrl && backendUrl.includes('http')) {
    const url = `${backendUrl}/api`;
    console.log('🚀 Production API URL:', url);
    return url;
  }
  
  // For local development: use proxy at /api
  console.log('🔄 Local development - using proxy at /api');
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔧 API Client initialized with baseURL:', API_BASE_URL);

// Create a single axios instance for all API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request interceptor to add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message, error.response?.status, error.config?.url);
    
    // If token is expired/invalid, clear it and redirect
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
