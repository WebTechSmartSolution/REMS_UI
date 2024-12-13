import { useState } from 'react';

export const useSignUpFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field, value) => {
    if (field === 'name') {
      return /^[a-zA-Z\s]+$/.test(value) ? '' : 'Name can only contain letters and spaces.';
    }
    if (field === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address.';
    }
    if (field === 'password') {
      return value.length >= 6 ? '' : 'Password must be at least 6 characters.';
    }
    if (field === 'mobile') {
      // Remove any non-numeric characters from the input value
      const numericValue = value.replace(/\D/g, '');
      // Format the number to have exactly 11 digits
      const formattedValue = numericValue.length === 11 ? numericValue : '';
      return formattedValue.length === 11 ? '' : 'Mobile number must be exactly 11 digits.';
    }
    return '';
  };
  

  const validateForm = (formData) => {
    const validationErrors = {};
    for (const [field, value] of Object.entries(formData)) {
      const error = validateField(field, value);
      if (error) validationErrors[field] = error;
    }
    return validationErrors;
  };

  return { validateField, validateForm, errors, setErrors, isSubmitting, setIsSubmitting };
};
