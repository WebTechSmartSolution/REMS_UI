// axiosInstance.js
import axios from 'axios';
import authService from './AuthService';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://example.com/api', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses (token expiration) and refresh the token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authService.refreshToken();
        const token = authService.getAccessToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        authService.logout(); // Log out if token refresh fails
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
