import { toast } from 'react-toastify';

import { jwtDecode } from 'jwt-decode';  // Use the named import

import axiosInstance from './axiosInstance';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const authService = {
  
  getUserIdFromAuthToken: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      return null;  // Return null if there's no token
    }

    try {
      const decodedToken = jwtDecode(token);  // Decode the token
      const userId = decodedToken.nameid; 
      
      return userId;  // Assuming 'userId' is the key in the token payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;  // Return null in case of any error
    }
  },
  
 login: async (email,Password) => {
    try {
      const response = await axiosInstance.post(`/Auth/login`, { email, Password });
     
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem("User", response.data.email);
     localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
     return {
      status: response.status,
      message: response.data.message,
    };
    } catch (error) {
      console.log(error.message)
      return error.response;
    }
  },
  

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("User");
    toast.success('Logged out successfully.');
    setTimeout(() => {
      window.location.href = '/login';// Redirect after a short delay
  }, 5000); },
       
    
    

  // Get access token
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  //Refresh token method with toast
  refreshToken: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const accessToken = localStorage.getItem(TOKEN_KEY);
    
    if (!refreshToken || !accessToken) {
      toast.error('Session expired. Please log in again.');
      authService.logout();
      return;
    }

    try {
      const response = await axiosInstance.post(`/Auth/refresh-token`, {
        token,
        refreshToken,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
        toast.success('Token refreshed successfully!');
      }

      return response;
    } catch (err) {
      
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
      const response = await axiosInstance.post('/Auth/signup', data);
  
      // Handle success response
      return {
        status: response.status,
        message: 'Signup successful! Please log in.'
       
      };
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
  
        // Customize error messages based on backend response
        if (statusCode === 409) {
          return {
            status: statusCode,
            message: 'Email already exists.'  // Specific error message
          };
        } else {
          return {
            status: statusCode,
            message: 'Failed to sign up. Please try again.'  // General error message for other statuses
          };
        }
      } else {
        // Network or unexpected error
        return {
          status: 'network_error',
          message: 'An error occurred. Please try again.'
        };
      }
    }},
  
  
  




  // Forgot password method with toast
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post(`/Auth/forgot-password`, { email });
      // toast.success('Password reset email sent successfully!');
      return response.data;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // toast.error(error.response ? error.response.data.message : 'Failed to send password reset email.');
      throw new Error(error.response ? error.response.data.message : error.message);
      //return response.error.message.details;
    }
  },

  // Handle/post new password and token with toast
  resetPassword: async (data) => {
    try {
      const response = await axiosInstance.post(`/Auth/reset-password`, {
        token: data.token,            // Make sure `token` is a string
        newPassword: data.newPassword // Make sure `newPassword` is a string
      });

      // Handle success
      if (response.status === 200) {
        // toast.success('Password reset successful!');
        return response.data;
      }

    } catch (error) {
      console.error("Reset Password error:", error.response ? error.response.data : error.message);

      if (error.response && error.response.data && error.response.data.errors) {
        console.error("Validation errors:", error.response.data.errors);
        // toast.error('Validation errors: ' + JSON.stringify(error.response.data.errors));
      } else {
         error(error.response ? error.response.data.message : 'An error occurred');
      }

      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

// call for sending filters valuses from home page for search
// searchProperties: async (searchData) => {
//   try {
//     const response = await axios.post('https://api.example.com/search', searchData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }


uploadImages: async (formData) => {
  try {
    const response = await axiosInstance.post('/Listings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imagePaths; // Assuming response sends back an array of image paths
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
},

PostListings: async (formData) => {
  try {
    const response = await axiosInstance.post('/Listings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imagePaths; // Assuming response sends back an array of image paths
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
},

};

export default authService;
