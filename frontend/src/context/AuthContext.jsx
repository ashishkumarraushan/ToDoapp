import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken, getToken, isAuthenticated } from '../api/authService';

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore and validate token from localStorage on mount
  useEffect(() => {
    // Clear localStorage on first load to start fresh
    console.log('🔄 AuthContext: App initialized - clearing potentially invalid tokens');
    localStorage.removeItem('token');
    setToken(null);
    setIsLoading(false);
  }, []);

  // Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setAuthToken(authToken);
    setError(null);
  };

  // Signup function
  const signup = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setAuthToken(authToken);
    setError(null);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    setError(null);
  };

  // Set error
  const setErrorMessage = (errorMsg) => {
    setError(errorMsg);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
    setErrorMessage,
    clearError,
    setLoading: setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
