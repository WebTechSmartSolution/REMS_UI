import axiosInstance from './axiosInstance';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
// const API_URL = 'http://localhost:5112/api/Auth'; // Make sure this matches your backend URL

const authService = {
  // Login and store tokens in localStorage
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post(`/login`, { email, password });
  
      // If login is successful and accessToken exists, show success toast
      if (response.data && response.data.accessToken) {
        localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
        toast.success('Login successful!');
        return response;
      }
  
      // If for some reason there is no accessToken, we handle it as a failure
      toast.error('Login failed. Please try again.');
      return response;
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle case when email or password is incorrect
      if (error.response && error.response.status === 401) {
        toast.error('Email or password is incorrect.');
      } else {
        // Handle any other errors
        toast.error(error.response ? error.response.data.message : 'Login failed!');
      }
  
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    toast.success('Logged out successfully.');
    window.location.href = '/login'; // Redirect to login page after logout
  },

  // Get access token
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Refresh token method with toast
  refreshToken: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const accessToken = localStorage.getItem(TOKEN_KEY);
    
    if (!refreshToken || !accessToken) {
      toast.error('Session expired. Please log in again.');
      authService.logout();
      return;
    }

    try {
      const response = await axiosInstance.post(`/refresh-token`, {
        accessToken,
        refreshToken,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
        toast.success('Token refreshed successfully!');
      }

      return response;
    } catch (err) {
      console.error('Error refreshing token', err);
      toast.error('Failed to refresh token. Logging out.');
      authService.logout(); // Logout if refresh fails
    }
  },

  // Check if the user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token; // Return true if there's a token
  },

  // Signup method with toast
  signup: async (data) => {
    try {
      const response = await axiosInstance.post(`/signup`, data);
  
      // Check if status is 200
      if (response.status === 200) {
        toast.success('Signup successful!');
        return response.data.message;
      } else if (response.status === 409) {
        toast.error('Email is already registered.');
        return response.data.message;
      }
    } catch (error) {
      // Handle error response based on status code
      if (error.response) {
        const statusCode = error.response.status;
  
        // Log the status code for debugging purposes
        console.log('Error status code:', statusCode);
  
        if (statusCode === 409) {
          // Email already exists
          toast.error('Email already exists.');
        } else {
          // General error message for other statuses
          toast.error('Signup failed. Please try again later.');
        }
      } else {
        // Handle network or unexpected errors
        toast.error('An error occurred. Please try again.');
      }
  
      // Rethrow the error if necessary for further handling
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  
  




  // Forgot password method with toast
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post(`/forgot-password`, { email });
      toast.success('Password reset email sent successfully!');
      return response.data;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error(error.response ? error.response.data.message : 'Failed to send password reset email.');
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  // Handle/post new password and token with toast
  resetPassword: async (data) => {
    try {
      const response = await axiosInstance.post(`/reset-password`, {
        token: data.token,            // Make sure `token` is a string
        newPassword: data.newPassword // Make sure `newPassword` is a string
      });

      // Handle success
      if (response.status === 200) {
        toast.success('Password reset successful!');
        return response.data;
      }

    } catch (error) {
      console.error("Reset Password error:", error.response ? error.response.data : error.message);

      if (error.response && error.response.data && error.response.data.errors) {
        console.error("Validation errors:", error.response.data.errors);
        toast.error('Validation errors: ' + JSON.stringify(error.response.data.errors));
      } else {
        toast.error(error.response ? error.response.data.message : 'An error occurred');
      }

      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

};

export default authService;
