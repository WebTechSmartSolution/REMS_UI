import { useState } from 'react';
import authService from '../../services/Auth_JwtApi/AuthService'; // Import authService for posting data
import { toast } from 'react-toastify'; // Import toast for notifications

export const useSignUpFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation logic
  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';

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
      setErrors({ general: 'Failed to sign up. Please try again.' });
      toast.error('Failed to sign up. Please try again.');
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
