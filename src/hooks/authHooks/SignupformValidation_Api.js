import { useState } from 'react';

export const SignUpFormValidation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      countryCode: form['country-code'].value,
      mobile: form.mobile.value,
      isAgent: form.agent.checked,
    };

    try {
      const response = await fetch('https://your-api-url.com/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        // Handle successful submission (e.g., redirect, clear form, etc.)
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleFormSubmit,
    isSubmitting,
  };
};
