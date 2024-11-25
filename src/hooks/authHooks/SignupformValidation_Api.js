import { useState } from 'react';
 // Import notify from '../../services/errorHandlingService';

export const useSignUpFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation logic
  const validateForm = (formData) => {
    const newErrors = {};
    const name = (formData.name || '').toString();
    const email = (formData.email || '').toString();
    const password = (formData.password || '').toString();
    const mobileNumber = (formData.mobileNumber || '').toString();

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';

    return newErrors;
  };

  return {
    validateForm,
    isSubmitting,
    setIsSubmitting,
    errors,
    setErrors,
  };
};
