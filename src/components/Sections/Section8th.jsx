import React, { useState } from 'react';
import './style/Section8th.css'; // Import your CSS
import { notify } from '../../services/errorHandlingService';

const Section8th = () => {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const isFormValid = () => {
    return formData.name && formData.email && formData.message;
  };

  const handleFormSubmission = () => {
    if (isFormValid()) {
      setIsLoading(true); // Set loading to true when form submission starts

      setTimeout(() => {
        notify('success', 'Form has been submitted!');

        setFormData({ name: '', email: '', message: '' });
        setIsLoading(false);
      }, 2000);
    } else {
      notify('error', 'Please fill in all the fields!');
    }
  };
  return (
    <section className="contact-section" id='contact-us'>
      <h2>Contact Us</h2>
      <p className="subtitle">We would love to hear from you! Please fill out the form below and we’ll get in touch shortly.</p>

      <div className="contact-form-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Email:</strong> info@rentalease.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> 1234 Street Name, City, Country</p>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>

          <button
            type="button"
            onClick={handleFormSubmission}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>


        </form>
      </div>
    </section>
  );
};

export default Section8th;
