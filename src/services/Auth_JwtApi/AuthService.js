import { toast } from 'react-toastify';

import { jwtDecode } from 'jwt-decode';  // Use the named import

import axiosInstance from './axiosInstance';
import { notify } from '../errorHandlingService';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const authService = {
  
// ============================================Api calls for User related calls ===============================================

getUserIdFromAuthToken: () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    //notify('error', 'No token found. Please log in.');
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken?.nameid || null; // Add a default fallback
  } catch (error) {
    return null; // Handle errors gracefully
  }
},

  fetchUserData: async () => {
    try {
      const response = await axiosInstance.get("/api/user"); 
      return response.data; 
    } catch (error) {
      // console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data. Please try again later.");
    }
  },
  
//  ........................................Auth related Api calls.....................................................


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
      // console.log(error.message)
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
  isAuthenticated: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
  
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  
      // If the token is expired, attempt to refresh
      if (decodedToken.exp < currentTime) {
        const response = await authService.refreshToken();
  
        // If refresh fails, notify the user and return false
        if (response?.status !== 200) {
          notify('error', 'Your session has expired. Please log in again.');
          return false;
        }
      }
  
      return true; // Token is valid
    } catch (error) {
      console.error("Error decoding token:", error);
      return false; // Return false if decoding fails
    }
  },
  
  // Signup method with toast
  signup: async (data) => {
    try {
      console.log(data);
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
        // console.error("Validation errors:", error.response.data.errors);
        // toast.error('Validation errors: ' + JSON.stringify(error.response.data.errors));
        return error.response.data.errors;
      } else {
         error(error.response ? error.response.data.message : 'An error occurred');
      }

      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },




// =============================================Api calls for Search data ================================





// call for sending filters valuses from home page for search
searchProperties: async (searchData) => {
  try {
    const response = await axiosInstance.post('https://api.example.com/search', searchData);
    return response.data;
  } catch (error) {
    throw error;
  }
},





// =============================================Api calls for Listing Property Post or get listings ================================




uploadImages: async (formData) => {
  try {
    const response = await axiosInstance.post('/Listings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.imagePaths; // Assuming response sends back an array of image paths
  } catch (error) {
    // console.error('Image upload failed:', error);
    throw error;
  }
},

PostListings: async (formData) => {
  try {
    const response = await axiosInstance.post('/Listings/AddListings', formData, {
      headers: { 
        'Authorization': `Bearer ${TOKEN_KEY}`,
        'Content-Type': 'multipart/form-data' },
    });
    if (response && response.data && response.data.images) {
      // console.log('Image Paths:', response.data.images.map(image => image.path)); // Log image paths from the response
      return response.data.images.map(image => image.path); 
    } else {
      // console.error('No images in response.');
      return [];
    }
  } catch (error) {
    // console.error('Image upload failed:', error);
    throw error;
  }
},


getListings: async () => {
  try {
    const userId = authService.getUserIdFromAuthToken();
    if (!userId) throw new Error("Invalid or missing user ID");
    console.log(userId);
    const response = await axiosInstance.get(`/Listings/user/${userId}`);
    console.log(response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    throw error.response?.data?.message || "Error fetching listings";
  }
},


fetchListingDetails: async (listingId) => {
  try {
    const response = await axiosInstance.get(`/Listings/${listingId}`);
    return response.data; 
  } catch (error) {
    // console.error('Failed to fetch listing details:', error);
    throw error; 
  }
},

ChangeListingStatus: async (id) => {
  try {
    const response = await axiosInstance.put(`/Listings/${id}`);
    return response.data;
  } catch (error) {
    // console.error('Error deleting listing:', error);
    throw error;
  }
},



// ================================================Call for Chat Room Creation ==============================================



StartChat_with_Listing_Owner:  async (form) => {
  const response = await axiosInstance.post("/chat/create-room", form);
  return response.data;
},





};

export default authService;
