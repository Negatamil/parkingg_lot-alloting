import api from './api';

const authAPI = {
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },

  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  getCurrentUser: () => {
    return api.get('/auth/me');
  },

  forgotPassword: (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  changePassword: (currentPassword, newPassword) => {
    return api.post('/auth/change-password', { currentPassword, newPassword });
  },
};

export default authAPI;
