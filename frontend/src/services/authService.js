import axiosInstance from '../api/axios';

const authService = {
  login: async (username, password) => {
    // API endpoint will correspond to JWT obtain endpoint: /token/ or /auth/login/
    const response = await axiosInstance.post('/auth/login/', { username, password });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await axiosInstance.post('/auth/register/', { username, email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
