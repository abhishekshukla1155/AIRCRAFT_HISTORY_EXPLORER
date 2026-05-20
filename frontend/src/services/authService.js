import api from '../api/api';

/**
 * Perform login request and store JWT token in localStorage.
 */
export const login = async (username, password) => {
  const response = await api.post('/accounts/login/', { username, password });
  if (response.data && response.data.access) {
    localStorage.setItem('access', response.data.access);
    if (response.data.refresh) {
      localStorage.setItem('refresh', response.data.refresh);
    }
  }
  return response.data;
};

/**
 * Register a new user account.
 */
export const register = async (userData) => {
  const response = await api.post('/accounts/register/', userData);
  return response.data;
};

/**
 * Clear JWT tokens from localStorage to logout the user.
 */
export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

/**
 * Get currently authenticated user details.
 */
export const getCurrentUser = async () => {
  const response = await api.get('/accounts/me/');
  return response.data;
};
