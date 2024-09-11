// authService.js
import axiosInstance from './axiosInstance';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const authService = {
  // Login and store tokens in localStorage
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    
    if (response.data && response.data.accessToken) {
      localStorage.setItem(TOKEN_KEY, response.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    }
    
    return response;
  },

  // Logout and remove tokens
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.location.href = '/login'; // Redirect to login page after logout
  },

  // Get access token
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Refresh the access token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      authService.logout();
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/refresh-token', {
        refreshToken,
      });
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
      }
      
      return response;
    } catch (err) {
      console.error('Error refreshing token', err);
      authService.logout(); // Logout if refresh fails
    }
  },

  // Check if the user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token; // Return true if there's a token
  },


  //Method for post signup page data to Api url
  signup: async (data) => {
    try {
      const response = await axiosInstance.post('/auth/signup', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
//Forgot password method
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  },

  /// Hnadle/post New password and Token
  resetPassword: ( token, newPassword) => {
    return axiosInstance.post(`${API_URL}/reset-password`, {
       
        token,
        newPassword
    });
}, 


};




export default authService;
