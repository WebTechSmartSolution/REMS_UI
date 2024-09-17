import { useState } from 'react';
import authService from '../../services/Auth_JwtApi/AuthService'; // Import authService for posting data
import { toast } from 'react-toastify'; // Import toast for notifications

export const useSignUpFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation logic
  const validateForm = (formData) => {
    // console.log('Form Data:', formData);  // Debugging line to check formData

    const newErrors = {};

    const name = (formData.name || '').toString(); // Ensure it's a string
  const email = (formData.email || '').toString(); // Ensure it's a string
  const password = (formData.password || '').toString(); // Ensure it's a string
  const mobileNumber = (formData.mobileNumber || '').toString(); // Ensure it's a string

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    return newErrors;
  };

  // Submission logic inside the hook
  const handleFormSubmit = async (e, formData) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // Validate form fields
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    // If validation passes, call the API via authService
    try {
      await authService.signup(formData);
      toast.success('Signup successful! Please log in.');
    } catch (error) {
      // Error handling based on error response or general failure
      if (error.response) {
        const statusCode = error.response.status;
    
        if (statusCode === 409) {
          // Email conflict error
          setErrors({ general: 'Email already exists.' });
          toast.error('Email already exists.');
        } else {
          // General error for other statuses
          setErrors({ general: 'Failed to sign up. Please try again.' });
          toast.error('Failed to sign up. Please try again.');
        }
      } else {
        // Network or unexpected error
        setErrors({ general: 'An error occurred. Please try again.' });
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleFormSubmit,
    isSubmitting,
    errors,
  };
};
