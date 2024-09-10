import React, { useState } from 'react';
import '../../style/Resetpass.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthService from '../../services/Auth_JwtApi/AuthService'; // Adjust the path based on your project structure

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.forgotPassword(email);
      setMessage(response.message || 'Password reset link sent. Please check your email.');
      setError(''); // Clear any previous error
    } catch (err) {
      setError('Failed to send password reset email. Please try again later.');
      setMessage(''); // Clear any previous message
    }
  };

  return (
    <div className='bdy'>
    <div className="forgot-password-container">
      <div className="back-home">
        <Link to="/">
          <span>↩</span> Back To Home
        </Link>
      </div>

      <h1>Forgot Password</h1>

      <form className="forgot-password-form" onSubmit={handleSubmit}>
      <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <div className="input-container">
          <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="login-link">
        <p>
          Remember login? <Link to="/login" className="sign-in-link">Sign In</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
