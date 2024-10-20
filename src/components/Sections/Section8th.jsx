import React, { useState } from 'react';
import './style/Section8th.css'; // Import your CSS

const Section8th = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus('');

    try {
      const response = await fetch('https://your-api-endpoint.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success'); // Form has been successfully submitted
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setSubmitStatus('error'); // Error occurred during submission
      }
    } catch (error) {
      setSubmitStatus('error'); // Network or API error
    } finally {
      setLoading(false);
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

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {submitStatus === 'success' && (
            <p className="success-message">Your form has been submitted successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="error-message">Error submitting the form. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Section8th;
